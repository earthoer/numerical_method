import { BrowserRouter as Router,Link,Route,Routes } from "react-router-dom"
const Chapter2 =()=>{
    return (
        <div >
              <ul>
                  <li>
                    <Link to="/chapter2/cramer">Cramer's Rule Method</Link>
                  </li>
                  <li>
                    <Link to="/chapter2/gausselimination">Gauss elimination Method</Link>
                  </li>
                  <li>
                    <Link to="/chapter2/gaussjordan">Gauss Jordan Method</Link>
                  </li>
                  <li>
                    <Link to="/chapter2/lu">LU Decomposition Method</Link>
                  </li>
                  <li>
                    <Link to="/chapter2/jacobi">Jacobi Iteration Method</Link>
                  </li>
                  <li>
                    <Link to="/chapter2/seidal">Gauss-Seidal Method</Link>
                  </li>
                  <li>
                    <Link to="/chapter2/conjugate">Conjugate Method</Link>
                  </li>

                  
              </ul>

         </div>
         )
}
export default Chapter2;