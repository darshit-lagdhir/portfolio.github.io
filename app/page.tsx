import BrutalistHero from "@/components/brutalist/BrutalistHero";
import BrutalistProjectsPreview from "@/components/brutalist/BrutalistProjectsPreview";
import BrutalistAbout from "@/components/brutalist/BrutalistAbout";
import BrutalistContact from "@/components/brutalist/BrutalistContact";

export default function Home() {
  return (
    <main className="w-full">
      <BrutalistHero />
      <BrutalistProjectsPreview />
      <BrutalistAbout />
      <BrutalistContact />
    </main>
  );
}
