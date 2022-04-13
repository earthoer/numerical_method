import Formcomponent from "../Formcomponent"
import { evaluate,parse,sqrt,abs,derivative,format,matrix,det,multiply,subset,index,row,column,transpose, ConditionalNodeDependencies} from "mathjs";
function geterror(x, y) {
    return abs((x - y) / x);
  }
const Newtonraphson = (equation,left)=>{
    let eq = "";
    let eqt;
    let e = 100000;
    let eps = 0.000001;
    let ans = 0;
    let i = 0;
    let temp = 0;
    let state = 0;
    let ar1=[]
    let ar2=[]
    if (equation.indexOf("x") < 0) {
      if (equation[0] === "-") {
        let teq = equation.substring(1);
        teq = teq.splice(0, "(").splice(teq.length + 1, ")");
        eq = "x+" + teq;
      } else {
        let teq = equation;
        teq = teq.splice(0, "(").splice(teq.length + 1, ")");
        console.log(teq);
        eq = "x-" + teq;
      }
      eqt = parse(eq);
    } else {
      eqt = parse(equation);
    }
    console.log(eqt.toString());
    let s = Number(left);
    let x = s;
    let div = derivative(eqt, "x");
    console.log("div : ", div.toString());
    let deltax = -(eqt.evaluate({ x: x }) / div.evaluate({ x: x }));
    let newx = x + deltax;
    e = geterror(newx, x);
    x = newx;
    ar1.push(x);
    ar2.push(e);
    while (e > eps) {
      deltax = -(eqt.evaluate({ x: x }) / div.evaluate({ x: x }));
      newx = x + deltax;
      e = geterror(newx, x);
      x = newx;
      ans = x;
      const data = [{ x: x }, { deltax: deltax }, { e, e }];
      console.log(data);
      const er = e;
      if (i > 0) {
        if (abs(er - temp) < 0.00005) {
          state += 1;
        } else {
          state = 0;
        }
        temp = er;
      }
      i++;
      if (state >= 5) {
        console.log("case 3");
        break;
      }
      ar1.push(ans);
      ar2.push(e);
      if (i === 1000) {
        break;
      }
    }
    let ar3 = []
    ar3.push(ar1)
    ar3.push(ar2)
    return (
        ar3
        )
}
export default Newtonraphson