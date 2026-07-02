import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ProblemSolversSection } from "@/components/ProblemSolversSection";
import { HowToUseSection } from "@/components/HowToUseSection";
import { KeepThinkingSection } from "@/components/KeepThinkingSection";
import { ModelsSection } from "@/components/ModelsSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col">
        <HeroSection />
        <ProblemSolversSection />
        <HowToUseSection />
        <KeepThinkingSection />
        <ModelsSection />
      </main>
      <Footer />
    </>
  );
}
