import Entrance from "@/components/sections/Entrance";
import Statement from "@/components/sections/Statement";
import Values from "@/components/sections/Values";
import LatestWork from "@/components/sections/LatestWork";
import VisualWorld from "@/components/sections/VisualWorld";
import Words from "@/components/sections/Words";
import Invitation from "@/components/sections/Invitation";
import ScrollReveals from "@/components/ScrollReveals";

export default function Home() {
  return (
    <main>
      <Entrance />
      <Statement />
      <Values />
      <LatestWork />
      <VisualWorld />
      <Words />
      <Invitation />
      <ScrollReveals />
    </main>
  );
}
