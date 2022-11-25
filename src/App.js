import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import VSM from "./pages/VSM";
import Hero from "./components/Hero";
import Landing from "./pages/Landing";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route exact path="/vsm" element={<VSM />} />
          <Route path="/telemedicine" element={<Home />} />
          {/* <Route path="/vsm" element={<VSM />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
