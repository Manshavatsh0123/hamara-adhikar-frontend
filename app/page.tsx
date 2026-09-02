import CategorySection from "@/components/LandingPage/CategorySection";
import LandingPage from "@/components/LandingPage/LandingPage";
import PopularSchemes from "@/components/LandingPage/PopularSchemes";
import PlatformStats from "@/components/LandingPage/PlatformStats";
import HowItWorks from "@/components/LandingPage/HowItWorks";
import Footer from "@/components/layout/Footer";
import AskSahayCTA from "@/components/LandingPage/AskSahayCTA";


export default function Home() {
  return (


    <main>
      <LandingPage />
      <CategorySection />
      <PopularSchemes />
      <HowItWorks />
      <PlatformStats />
      <AskSahayCTA />
      <Footer />
    </main>

  );
}
