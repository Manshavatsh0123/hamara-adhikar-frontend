import CategorySection from "@/components/LandingPage/CategorySection";
import LandingPage from "@/components/LandingPage/LandingPage";
import Hero from "@/components/LandingPage/HomeSection";
import PopularSchemes from "@/components/LandingPage/PopularSchemes";
import SearchBar from "@/components/LandingPage/SearchBar";
import PlatformStats from "@/components/LandingPage/PlatformStats";
import HowItWorks from "@/components/LandingPage/HowItWorks";
import Footer from "@/components/layout/Footer";


export default function Home() {
  return (


    <main>
      <LandingPage />
      <Hero />
      <SearchBar />
      <CategorySection />
      <PopularSchemes />
      <HowItWorks />
      <PlatformStats />
      <Footer />
    </main>

  );
}