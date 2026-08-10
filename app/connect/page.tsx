import type { Metadata } from "next";
import ConnectExperience from "@/components/connect/ConnectExperience";

export const metadata: Metadata = {
  title: "Connect — One Voice",
  description:
    "Invite One Voice to sing with you, or just say hi. We read every message ourselves.",
};

export default function ConnectPage() {
  return (
    <main className="min-h-screen bg-bone px-6 pb-28 pt-32 sm:px-10 sm:pt-40">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 max-w-xl">
          <div className="label-text mb-5 text-deep-brown/60">connect</div>
          <h1 className="text-[36px] font-semibold leading-[1.1] text-charcoal sm:text-[52px] lg:text-[60px]">
            let&rsquo;s talk.
          </h1>
        </div>
        <ConnectExperience />
      </div>
    </main>
  );
}
