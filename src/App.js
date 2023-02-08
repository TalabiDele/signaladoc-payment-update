import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Nav from "./components/Nav";
import VSM from "./pages/VSM";
import Hero from "./components/Hero";
import Landing from "./pages/Landing";
import VsmLogin from "./pages/VsmLogin";
import Plans from "./pages/Plans";
import AuthContext from "./Context/AuthContext";
import { useContext } from "react";
import Checkout from "./pages/Checkout";

function App() {
  const { user, selected } = useContext(AuthContext);

  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route path="/activate/vsm" element={<Plans />} />

          <Route
            exact
            path="/activate/vsm/register"
            element={
              !user ? (
                <VSM />
              ) : (
                <Navigate to="/activate/vsm/plans" replace={true} />
              )
            }
          />
          <Route
            exact
            path="/activate/vsm/login"
            element={
              !user ? (
                <VsmLogin />
              ) : (
                <Navigate to="/activate/vsm/plans" replace={true} />
              )
            }
          />
          <Route exact path="/activate/vsm/plans" element={<Plans />} />
          <Route
            exact
            path="/activate/vsm/checkout"
            element={
              user ? (
                selected ? (
                  <Checkout />
                ) : (
                  <Navigate to="/activate/vsm/plans" replace={true} />
                )
              ) : (
                <Navigate to="/activate/vsm/register" replace={true} />
              )
            }
          />
          {/* <Route path="/telemedicine" element={<Home />} /> */}
          {/* <Route path="/vsm" element={<VSM />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
