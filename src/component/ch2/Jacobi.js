import Formcomponent from "../Formcomponent";
import { evaluate,parse,sqrt,abs,derivative,format,matrix,det,multiply,subset,index,row,column,transpose, ConditionalNodeDependencies} from "mathjs";
import Checkmultierror from './../Checkmultierror'
function geterror(x, y) {
    return abs((x - y) / x);
  }

const Jacobi = (equation,equationans,left)=>{
    let eps = 0.000001;
    let ar = []
    let er = []
    let eq = JSON.parse(equation);
    const eqans = JSON.parse(equationans);
    let error = new Array(eq[0].length).fill(100)
    let x = JSON.parse("["+left+"]");
    let state = 0;
    let old = 0;
    let i =0;
    while(Checkmultierror(error,eps)){
      // 
      // 
      if(state ===5||i===100){
        break;
      }
      let xn = new Array(eq[0].length).fill(0)
      
      for(let i  =0 ;i<eq.length;i++){
        xn[i]=eqans[i]
        for(let j = 0;j<eq[0].length;j++){
          if(i!==j){
            xn[i]-=(eq[i][j]*x[j])
          }
        }
        xn[i]/=eq[i][i]
        // 
        // 
        error[i]=geterror(xn[i],x[i])
      }
      
      if(state === 0){
        old = xn[0]
        state++;
      }
      if(abs(xn[0]-old)<=0.0001){
        state++;
      }
      else{
        state = 0;
      }


      ar.push(JSON.parse(JSON.stringify(xn)))
      er.push(JSON.parse(JSON.stringify(error)))
      x =JSON.parse(JSON.stringify(xn))
      i++;
    }
    let re =  []
    
    re.push(ar)
    re.push(er)
    re.push(x)
  
    return (
        re)
}
export default Jacobi;