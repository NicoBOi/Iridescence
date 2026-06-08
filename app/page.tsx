import Nav from "./components/Nav";
import HeroSection from "./components/HeroSection";
import ManifestoSection from "./components/ManifestoSection";
import PortfolioPreview from "./components/PortfolioPreview";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";

export default function Home() {
  return (
    <>
      <Cursor />
      <Nav />
      <main>
        <HeroSection />
        <ManifestoSection />
        <PortfolioPreview />
      </main>
      <Footer />
    </>
  );
}
