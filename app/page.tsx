import BrutalistHero from "@/components/brutalist/BrutalistHero";
import BrutalistAbout from "@/components/brutalist/BrutalistAbout";
import BrutalistProjectsPreview from "@/components/brutalist/BrutalistProjectsPreview";
import BrutalistFocus from "@/components/brutalist/BrutalistFocus";
import BrutalistContact from "@/components/brutalist/BrutalistContact";

export default function Home() {
  return (
    <div className="w-full bg-[#050505] text-neutral-50">
      <BrutalistHero />
      <BrutalistAbout />
      <BrutalistProjectsPreview />
      <BrutalistFocus />
      <BrutalistContact />
    </div>
  );
}
