
import { BrowserRouter as Router,Link,Route,Routes } from "react-router-dom"
const Chapter3 = ()=>{


    return (
    <div >
          <ul>
              <li>
                <Link to="/chapter3/newtondivide">Newton Divide Method</Link>
              </li>
              <li>
                <Link to="/chapter3/lagrange">Lagrange Interpolation Method</Link>
              </li>
            
     
          </ul>
     </div>
     )
  
}
export default Chapter3
