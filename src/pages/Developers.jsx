import DeveloperHero from "../components/developers/DevelopersHero";
import DeveloperSection from "../components/developers/DeveloperSection";

export default function Developers() {

  return (
    <div className="min-h-screen bg-black">
      <DeveloperHero />
      <DeveloperSection />
    </div>
  );
}
