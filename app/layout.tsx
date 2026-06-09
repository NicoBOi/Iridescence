import type { Metadata } from "next";
import "./globals.css";
import MotionProvider from "./components/MotionProvider";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import PanelRail from "./components/PanelRail";
import YoutubeBackdrop from "./components/YoutubeBackdrop";
import Preloader from "./components/Preloader";
import EdgeMarkers from "./components/EdgeMarkers";
import FilmPlayer from "./components/FilmPlayer";

export const metadata: Metadata = {
  metadataBase: new URL("https://iridescence-ten.vercel.app"),
  title: "Iridescence",
  description: "Maison de production indépendante. Bordeaux. Films, documentaires, clips.",
  openGraph: {
    title: "Iridescence",
    description: "Maison de production indépendante. Bordeaux.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        {/* Vidéo : fond constant, toujours là, jamais interrompue. */}
        <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
          <YoutubeBackdrop />
        </div>
        {/* Contenu : couches au-dessus du film. */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <Nav />
          <PanelRail />
          <EdgeMarkers />
          <MotionProvider>{children}</MotionProvider>
          <Footer />
        </div>
        <FilmPlayer />
        <Preloader />
      </body>
    </html>
  );
}
