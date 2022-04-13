// import logo from './logo.svg';
import './App.css';
import Homepage from './component/Homepage';
import {useNavigate ,Link, Route,Routes,BrowserRouter as Router} from 'react-router-dom'
import Chapter1 from './component/ch1/Chapter1'
import Chapter2 from './component/ch2/Chapter2';

import Formcomponent from './component/Formcomponent';
import Chapter3 from './component/ch3/Chapter3';
function App() {


  
  return (
    <div>
      <Homepage />
      {/* <button onClick={()=>history(-1)}>Back</button> */}
      <Router>
        <div className="home">
          <div>
            <ul className="main">
              <li>
                <Link to="/">home</Link>
              </li>
              <li className="a">
                <Link to="/chapter1/*">Root of Equation</Link>
              </li>
              <li className="a">
                <Link to="/chapter2/*">Linear algebra</Link>
              </li>
              <li className="a">
                <Link to="/chapter3/*">Interpolation and extrapolation</Link>
              </li>
            </ul>
          </div>
          <Routes>
            <Route
              path="/"
              exact
            ></Route>
            <Route path="/chapter1/*" exact element={<Chapter1 />}></Route>
            <Route
              path="/chapter1/bisection"
              element={
                <div>
                  <Chapter1 />
                  <Formcomponent states = "bisection"/>
                </div>
              }
            ></Route>
            <Route
              path="/chapter1/falseposition"
              element={
                <div>
                  <Chapter1 />
                  <Formcomponent states ="falseposition"/>
                </div>
              }
            ></Route>
            <Route
              path="/chapter1/onepoint"
              element={
                <div>
                  <Chapter1 />
                  <Formcomponent states = "onepoint"/>
                </div>
              }
            ></Route>
            <Route
              path="/chapter1/newton"
              element={
                <div>
                  <Chapter1 />
                  <Formcomponent states = 'newtonraphson'/>
                </div>
              }
            ></Route>
            <Route path="/chapter2/*" exact element={<Chapter2 />}></Route>
            <Route
              path="/chapter2/cramer"
              element={
                <div>
                  <Chapter2 />
                  <Formcomponent states = "cramer"/>
                </div>
              }
            ></Route>
            <Route
              path="/chapter2/gausselimination"
              element={
                <div>
                  <Chapter2 />
                  <Formcomponent states = "gauseeliminate"/>
                </div>
              }
            ></Route>
            <Route
              path="/chapter2/gaussjordan"
              element={
                <div>
                  <Chapter2 />
                  <Formcomponent states = "gaussjordan"/>
                </div>
              }
            ></Route>

            <Route
              path="/chapter2/lu"
              element={
                <div>
                  <Chapter2 />
                  <Formcomponent states = "lu"/>
                </div>
              }
            ></Route>
            <Route
              path="/chapter2/jacobi"
              element={
                <div>
                  <Chapter2 />
                  <Formcomponent states = "jacobi"/>
                </div>
              }
            ></Route>
            <Route
              path="/chapter2/seidal"
              element={
                <div>
                  <Chapter2 />
                  <Formcomponent states = "seidal"/>
                </div>
              }
            ></Route>
            <Route
              path="/chapter2/conjugate"
              element={
                <div>
                  <Chapter2 />
                  <Formcomponent states = "conjugate"/>
                </div>
              }
            ></Route>
            <Route path="/chapter3/*" exact element={<Chapter3 />}></Route>
            <Route
              path="/chapter3/newtondivide"
              element={
                <div>
                  <Chapter3 />
                  <Formcomponent states = "newtondivide"/>
                </div>
              }
            ></Route>
            <Route
              path="/chapter3/lagrange"
              element={
                <div>
                  <Chapter3 />
                  <Formcomponent states = "lagrange"/>
                </div>
              }
            ></Route>




          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
