
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
              <li>
                <Link to="/chapter1/newton"> Newton Raphson Method</Link>
              </li>
          </ul>
     </div>
     )
  
}
export default Chapter1
