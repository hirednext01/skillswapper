import type { Metadata } from "next";
import MemberShell from "@/components/MemberShell";
import WorkroomView from "./WorkroomView";

export const metadata: Metadata = {
  title: "Workroom",
  robots: { index: false },
};

export default function WorkroomPage() {
  return (
    <MemberShell
      title="Workroom"
      sub="Contract: Landing page for fintech startup · with Rahul Menon (Demo data)"
    >
      <WorkroomView />
    </MemberShell>
  );
}
