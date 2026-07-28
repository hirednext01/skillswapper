import type { Metadata } from "next";
import Nav from "@/components/Nav";
import OnboardingWizard from "./OnboardingWizard";

export const metadata: Metadata = {
  title: "Join SkillSwap",
  description: "Create your account, tell us what you offer and what you need, and start bartering skills.",
};

export default function OnboardingPage() {
  return (
    <>
      <Nav />
      <main className="gradient-hero min-h-[calc(100vh-4rem)] py-10 sm:py-14">
        <OnboardingWizard />
      </main>
    </>
  );
}
