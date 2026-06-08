import Nav from "./components/Nav";
import Masthead from "./components/Masthead";
import IndexList from "./components/IndexList";
import Note from "./components/Note";
import Generique from "./components/Generique";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Masthead />
        <IndexList />
        <Note />
        <Generique />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
