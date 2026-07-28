"use client";

import { useMemo, useState } from "react";
import JobCard from "@/components/JobCard";
import { categories, jobs } from "@/lib/data";

const SORTS = [
  "Newest first",
  "Best match",
  "Highest credits",
  "Lowest competition",
  "Urgent",
  "Fastest completion",
] as const;

const MODES = ["Any", "Remote", "Onsite", "Hybrid"] as const;
const KINDS = ["Any", "Digital", "Physical"] as const;

export default function JobsExplorer() {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("All categories");
  const [mode, setMode] = useState<(typeof MODES)[number]>("Any");
  const [kind, setKind] = useState<(typeof KINDS)[number]>("Any");
  const [minCredits, setMinCredits] = useState(0);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sort, setSort] = useState<(typeof SORTS)[number]>("Newest first");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = jobs.filter((j) => {
      if (q && !`${j.title} ${j.description} ${j.skills.join(" ")}`.toLowerCase().includes(q.toLowerCase())) return false;
      if (category !== "All categories" && j.category !== category) return false;
      if (mode !== "Any" && j.mode !== mode) return false;
      if (kind !== "Any" && j.kind !== kind) return false;
      if (j.credits < minCredits) return false;
      if (verifiedOnly && !j.verifiedPoster) return false;
      return true;
    });
    switch (sort) {
      case "Newest first":
        list = [...list].sort((a, b) => a.postedMinutesAgo - b.postedMinutesAgo);
        break;
      case "Highest credits":
        list = [...list].sort((a, b) => b.credits - a.credits);
        break;
      case "Lowest competition":
        list = [...list].sort((a, b) => a.applications - b.applications);
        break;
      case "Urgent":
        list = [...list].sort((a, b) => Number(b.urgent) - Number(a.urgent));
        break;
      case "Fastest completion":
        list = [...list].sort((a, b) => a.deadlineDays - b.deadlineDays);
        break;
      default:
        break;
    }
    return list;
  }, [q, category, mode, kind, minCredits, verifiedOnly, sort]);

  const reset = () => {
    setQ("");
    setCategory("All categories");
    setMode("Any");
    setKind("Any");
    setMinCredits(0);
    setVerifiedOnly(false);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      {/* -------- Filters -------- */}
      <aside>
        <button
          className="btn-secondary btn-md mb-4 w-full lg:hidden"
          onClick={() => setShowFilters(!showFilters)}
          aria-expanded={showFilters}
        >
          {showFilters ? "Hide filters" : "Show filters"}
        </button>

        <div className={`card space-y-6 p-5 lg:sticky lg:top-24 ${showFilters ? "" : "hidden lg:block"}`}>
          <div>
            <label className="label" htmlFor="job-search">Keyword</label>
            <input
              id="job-search"
              className="input"
              placeholder="Search jobs, skills…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>

          <div>
            <label className="label" htmlFor="job-category">Category</label>
            <select
              id="job-category"
              className="input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>All categories</option>
              {categories.map((c) => (
                <option key={c.name}>{c.name}</option>
              ))}
            </select>
          </div>

          <fieldset>
            <legend className="label">Work mode</legend>
            <div className="flex flex-wrap gap-2">
              {MODES.map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`chip transition ${mode === m ? "bg-violet-600 text-white" : "bg-surface-soft text-ink-soft hover:bg-violet-50 hover:text-violet-700"}`}
                >
                  {m}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="label">Work type</legend>
            <div className="flex flex-wrap gap-2">
              {KINDS.map((k) => (
                <button
                  key={k}
                  onClick={() => setKind(k)}
                  className={`chip transition ${kind === k ? "bg-violet-600 text-white" : "bg-surface-soft text-ink-soft hover:bg-violet-50 hover:text-violet-700"}`}
                >
                  {k}
                </button>
              ))}
            </div>
          </fieldset>

          <div>
            <label className="label" htmlFor="min-credits">
              Minimum credits:{" "}
              <span className="text-violet-700">{minCredits.toLocaleString("en-IN")}</span>
            </label>
            <input
              id="min-credits"
              type="range"
              min={0}
              max={20000}
              step={1000}
              value={minCredits}
              onChange={(e) => setMinCredits(Number(e.target.value))}
              className="w-full accent-violet-600"
            />
          </div>

          <label className="flex cursor-pointer items-center gap-2.5 text-sm font-medium text-ink">
            <input
              type="checkbox"
              checked={verifiedOnly}
              onChange={(e) => setVerifiedOnly(e.target.checked)}
              className="h-4 w-4 rounded accent-violet-600"
            />
            Verified posters only
          </label>

          <button onClick={reset} className="btn-ghost btn-sm w-full">
            Reset filters
          </button>

          <div className="rounded-xl bg-violet-50 p-4">
            <p className="text-xs font-bold text-violet-800">🔔 Job alerts</p>
            <p className="mt-1 text-xs leading-relaxed text-violet-700/80">
              Get notified when jobs match your skills, category, location or
              minimum credit reward.
            </p>
            <button className="btn-primary btn-sm mt-3 w-full">Create alert</button>
          </div>
        </div>
      </aside>

      {/* -------- Results -------- */}
      <div>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-medium text-ink-soft" role="status">
            <strong className="text-ink">{filtered.length}</strong> job{filtered.length === 1 ? "" : "s"} found
          </p>
          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-ink-faint" htmlFor="job-sort">Sort</label>
            <select
              id="job-sort"
              className="input w-auto py-2 text-xs"
              value={sort}
              onChange={(e) => setSort(e.target.value as (typeof SORTS)[number])}
            >
              {SORTS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="card flex flex-col items-center gap-3 p-14 text-center">
            <span className="text-5xl" aria-hidden>🔍</span>
            <h2 className="text-lg font-bold text-ink">No jobs match your filters</h2>
            <p className="max-w-sm text-sm text-ink-soft">
              Try widening the credit range or clearing a category filter. New
              jobs are posted every few minutes.
            </p>
            <button onClick={reset} className="btn-primary btn-md mt-2">
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {filtered.map((j) => (
              <JobCard key={j.id} job={j} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
