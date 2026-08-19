import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coming soon — One Voice",
  description: "Not here yet. Check back soon.",
};

export default function ComingSoonPage() {
  return (
    <main className="flex min-h-[100svh] items-center justify-center px-5">
      <h1 className="display-lg">coming soon.</h1>
    </main>
  );
}
