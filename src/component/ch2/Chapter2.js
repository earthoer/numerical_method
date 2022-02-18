import { BrowserRouter as Router,Link,Route,Routes } from "react-router-dom"
const Chapter2 =()=>{
    return (
        <div >
              <ul>
                  <li>
                    <Link to="/chapter2/cramer">Cramer's Rule Method</Link>
                  </li>
                  {/* <li>
                    <Link to="/chapter1/falseposition">False position Method</Link>
                  </li>
                  <li>
                    <Link to="/chapter1/onepoint">One Point iteration Method</Link>
                  </li>
                  <li>
                    <Link to="/chapter1/newton">False Newton Raphson Method</Link>
                  </li> */}
              </ul>
         </div>
         )
}
export default Chapter2;