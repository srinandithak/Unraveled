import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesPreview } from "@/components/sections/FeaturesPreview";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { DeathClockDemo } from "@/components/sections/DeathClockDemo";
import { ScoringMethodology } from "@/components/sections/ScoringMethodology";
import { ExtensionPreview } from "@/components/sections/ExtensionPreview";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-full overflow-hidden bg-charcoal selection:bg-rust/30">
      <Navbar />
      <HeroSection />
      <FeaturesPreview />
      <HowItWorks />
      <DeathClockDemo />
      <ScoringMethodology />
      <ExtensionPreview />
      <Footer />
    </main>
  );
}
