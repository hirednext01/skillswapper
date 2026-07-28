import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import JobsExplorer from "./JobsExplorer";

export const metadata: Metadata = {
  title: "Browse Jobs — Grab a New Job",
  description:
    "Fresh work opportunities posted by verified members. Earn Skill Credits by completing jobs — newest jobs first.",
};

export default function JobsPage() {
  return (
    <>
      <Nav />
      <main className="container-page py-10">
        <div className="mb-8">
          <p className="eyebrow mb-2 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-coral-500 animate-pulse-dot" />
            Live feed · updates in real time
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Grab a New Job
          </h1>
          <p className="mt-2 max-w-2xl text-ink-soft">
            Newest verified jobs first. Grab one, deliver great work, earn
            credits — then spend them on whatever <em>you</em> need done.
          </p>
        </div>
        <JobsExplorer />
      </main>
      <Footer />
    </>
  );
}
