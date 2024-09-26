import FeaturedServices from "@/components/home/FeaturedServices";
import { HeroSection } from "@/components/home/HeroSection";
import OfferedSection from "@/components/home/OfferdSection";

const Home = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <OfferedSection></OfferedSection>
      <FeaturedServices></FeaturedServices>
    </div>
  );
};

export default Home;
