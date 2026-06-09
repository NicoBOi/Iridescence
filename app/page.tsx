import Masthead from "./components/Masthead";
import IndexList from "./components/IndexList";
import Note from "./components/Note";
import Generique from "./components/Generique";
import Contact from "./components/Contact";
import VelocityMarquee from "./components/VelocityMarquee";

export default function Home() {
  return (
    <main>
      <Masthead />
      <VelocityMarquee />
      <IndexList />
      <Note />
      <Generique />
      <Contact />
    </main>
  );
}
