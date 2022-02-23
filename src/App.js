// import logo from './logo.svg';
import './App.css';
import Homepage from './component/Homepage';
import ListComponent from './component/Listcomponent'
import {useNavigate ,Link, Route,Routes,BrowserRouter as Router} from 'react-router-dom'
import Chapter1 from './component/ch1/Chapter1'
import Chapter2 from './component/ch2/Chapter2';
import Bisection from './component/ch1/Bisection'
import FalsePosition from './component/ch1/FalsePosition'
import OnePoint from './component/ch1/OnePoint';
import Newtonraphson from './component/ch1/Newtonraphson';
import CramerRule from './component/ch2/CramerRule';
import Gauseeliminate from './component/ch2/Gausselimination';
import GaussJordan from './component/ch2/GaussJordan';
import LU from './component/ch2/LU';
import Gausseliminate from './component/ch2/Gausselimination';
function App() {
  const ar = [
    {name :"บทที่ 1" ,key: 1},
    {name :"บทที่ 2",key: 2},
    {name :"บทที่ 3",key: 3}
  ]
  const ar2 = [
    {name :"Bisection Method" ,key: 1},
    {name :"False position Method",key: 2},
    {name :"Compitational Procedure",key: 3},
    {name :"One-Point Iteration Method",key: 4},
    {name :"False position Method",key: 5},
  ]

  // const history = useNavigate();
  
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
            </ul>
          </div>
          <Routes>
            <Route
              path="/"
              exact
              // element={
              //   <div>
              //     <ListComponent item={ar} />
              //   </div>
              // }
            ></Route>
            <Route path="/chapter1/*" exact element={<Chapter1 />}></Route>
            <Route
              path="/chapter1/bisection"
              element={
                <div>
                  <Chapter1 />
                  <Bisection />
                </div>
              }
            ></Route>
            <Route
              path="/chapter1/falseposition"
              element={
                <div>
                  <Chapter1 />
                  <FalsePosition />
                </div>
              }
            ></Route>
            <Route
              path="/chapter1/onepoint"
              element={
                <div>
                  <Chapter1 />
                  <OnePoint />
                </div>
              }
            ></Route>
            <Route
              path="/chapter1/newton"
              element={
                <div>
                  <Chapter1 />
                  <Newtonraphson />
                </div>
              }
            ></Route>
            <Route path="/chapter2/*" exact element={<Chapter2 />}></Route>
            <Route
              path="/chapter2/cramer"
              element={
                <div>
                  <Chapter2 />
                  <CramerRule />
                </div>
              }
            ></Route>
            <Route
              path="/chapter2/gausselimination"
              element={
                <div>
                  <Chapter2 />
                  <Gausseliminate />
                </div>
              }
            ></Route>
            <Route
              path="/chapter2/gaussjordan"
              element={
                <div>
                  <Chapter2 />
                  <GaussJordan />
                </div>
              }
            ></Route>

            <Route
              path="/chapter2/lu"
              element={
                <div>
                  <Chapter2 />
                  <LU />
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
