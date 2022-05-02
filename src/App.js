// import logo from './logo.svg';
import "./App.css";

import { Link, Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Chapter1 from "./component/ch1/Chapter1";
import Chapter2 from "./component/ch2/Chapter2";

import Formcomponent from "./component/Formcomponent";
import Chapter3 from "./component/ch3/Chapter3";
import Navbar from "./component/Nav/Navbar";
import Home from "./component/Home";

function App() {
  return (
    <div className="all">
      <head></head>
      <Router>
        <div class="stars">
          <div class="star"></div>
          <div class="star"></div>
          
          <div class="star"></div>
        </div>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />}></Route>
          <Route
            path="/chapter1/bisection"
            element={
              <div>
                <Formcomponent states="bisection" />
              </div>
            }
          ></Route>
          <Route
            path="/chapter1/falseposition"
            element={
              <div>
                <Formcomponent states="falseposition" />
              </div>
            }
          ></Route>
          <Route
            path="/chapter1/onepoint"
            element={
              <div>
                <Formcomponent states="onepoint" />
              </div>
            }
          ></Route>
          <Route
            path="/chapter1/newton"
            element={
              <div>
                <Formcomponent states="newtonraphson" />
              </div>
            }
          ></Route>
          <Route
            path="/chapter2/cramer"
            element={
              <div>
                <Formcomponent states="cramer" />
              </div>
            }
          ></Route>
          <Route
            path="/chapter2/gausselimination"
            element={
              <div>
                <Formcomponent states="gauseeliminate" />
              </div>
            }
          ></Route>
          <Route
            path="/chapter2/gaussjordan"
            element={
              <div>
                <Formcomponent states="gaussjordan" />
              </div>
            }
          ></Route>

          <Route
            path="/chapter2/lu"
            element={
              <div>
                <Formcomponent states="lu" />
              </div>
            }
          ></Route>
          <Route
            path="/chapter2/jacobi"
            element={
              <div>
                <Formcomponent states="jacobi" />
              </div>
            }
          ></Route>
          <Route
            path="/chapter2/seidal"
            element={
              <div>
                <Formcomponent states="seidal" />
              </div>
            }
          ></Route>
          <Route
            path="/chapter2/conjugate"
            element={
              <div>
                <Formcomponent states="conjugate" />
              </div>
            }
          ></Route>
          <Route
            path="/chapter3/newtondivide"
            element={
              <div>
                <Formcomponent states="newtondivide" />
              </div>
            }
          ></Route>
          <Route
            path="/chapter3/lagrange"
            element={
              <div>
                <Formcomponent states="lagrange" />
              </div>
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
