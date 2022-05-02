import Formcomponent from "../Formcomponent";
import { evaluate,parse,sqrt,abs,derivative,format,matrix,det,multiply,subset,index,row,column,transpose, ConditionalNodeDependencies} from "mathjs";

const CramerRule = (eq,eqans)=>{
    
    const mata = matrix(eq);
          let rows = mata.size()[0];
          let columns = mata.size()[1];
          let deta = det(mata);
          let ar = []
          for (let i = 0; i < rows; i++) {
            let matc = JSON.parse(JSON.stringify(eq));
            for (let j = 0; j < columns; j++) {
              matc[j][i] = eqans[j];
            }
            let rmatc = matrix(matc);
            let detc = det(rmatc)           
            let ans = detc/deta
            ar.push(ans)
          } 
    console.log(ar)
    return (
        ar
        )
}
export default CramerRule;