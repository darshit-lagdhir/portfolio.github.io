import BrutalistHero from "@/components/brutalist/BrutalistHero";
import BrutalistAbout from "@/components/brutalist/BrutalistAbout";
import BrutalistProjectsPreview from "@/components/brutalist/BrutalistProjectsPreview";
import BrutalistFocus from "@/components/brutalist/BrutalistFocus";
import BrutalistContact from "@/components/brutalist/BrutalistContact";
import InfiniteMarquee from "@/components/brutalist/InfiniteMarquee";

export default function Home() {
  return (
    <div className="w-full">
      <BrutalistHero />
      <BrutalistAbout />
      <InfiniteMarquee />
      <BrutalistProjectsPreview />
      <BrutalistFocus />
      <BrutalistContact />
    </div>
  );
}
