import Hero from "./components/Hero";
// import Statement from "./components/Statement";
import Events from "./components/Events";
import Venue from "./components/Venue";
import Footer from "./components/Footer";
import DoorIntro from "./components/DoorIntro";
import Ticker from "./components/Ticker";
import useReveal from "./utils/useReveal";

function App() {
  useReveal();

  return (
    <>
      <DoorIntro />
      <Hero />
      <Events />
      <Ticker />
      <Venue />
      <Footer />
    </>
  );
}

export default App;