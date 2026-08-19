import Entrance from "@/components/sections/Entrance";
import VerseBand from "@/components/sections/VerseBand";
import Statement from "@/components/sections/Statement";
import LatestWork from "@/components/sections/LatestWork";
import VisualWorld from "@/components/sections/VisualWorld";
import Invitation from "@/components/sections/Invitation";
import ScrollReveals from "@/components/ScrollReveals";

export default function Home() {
  return (
    <main>
      <Entrance />
      <VerseBand />
      <Statement />
      <LatestWork />
      <VisualWorld />
      <Invitation />
      <ScrollReveals />
    </main>
  );
}
