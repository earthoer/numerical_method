import Bisection from "./Bisection"
import FalsePosition from "./FalsePosition"
import { BrowserRouter as Router,Link,Route,Routes } from "react-router-dom"
const Chapter1 = ()=>{


    return (
    <div >
          <ul>
              <li>
                <Link to="/chapter1/bisection">Bisection Method</Link>
              </li>
              <li>
                <Link to="/chapter1/falseposition">False position Method</Link>
              </li>
              <li>
                <Link to="/chapter1/onepoint">One Point iteration Method</Link>
              </li>
              {/* <li>
                <Link to="/chapter1/newton">False Newton Raphson Method</Link>
              </li> */}
          </ul>
     </div>
     )
  
}
export default Chapter1
// {name :"Bisection Method" ,key: 1},
// {name :"False position Method",key: 2},
// {name :"Compitational Procedure",key: 3},
// {name :"One-Point Iteration Method",key: 4},
// {name :"False position Method",key: 5},