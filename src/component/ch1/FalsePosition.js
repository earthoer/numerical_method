import Formcomponent from "../Formcomponent";
import { evaluate,parse,sqrt,abs,derivative,format,matrix,det,multiply,subset,index,row,column,transpose, ConditionalNodeDependencies} from "mathjs";
function geterror(x, y) {
    return abs((x - y) / x);
  }
function getfalsepos(xl, xr, fxl, fxr) {
    return (xl * fxr - xr * fxl) / (fxr - fxl);
  }
const FalsePosition = (equation,l,r) =>{
    let eq = "";
    let eqt;
    let e = 100000;
    let eps = 0.000001;
    let old = 0;
    let ans = 0;
    let i = 0;
    let temp = 0;
    let state = 0;
    let ar1 =[]
    let ar2 =[]
    if (equation.indexOf("x") < 0) {
      if (equation[0] === "-") {
        let teq = equation.substring(1);
        teq = teq.splice(0, "(").splice(teq.length + 1, ")");
        eq = "x+" + teq;
      } else {
        let teq = equation;
        teq = teq.splice(0, "(").splice(teq.length + 1, ")");
        eq = "x-" + teq;
      }
      eqt = parse(eq);
    } else {
      eqt = parse(equation);
    }

    while (e > eps) {
      console.log(eqt.toString())
      console.log(e)
      let fl = eqt.evaluate({ x: l });
      let fr = eqt.evaluate({ x: r });
      let x = getfalsepos(l, r, fl, fr);
      let fx = eqt.evaluate({ x: x });
      if (fx * fr > 0) {
        old = r;
        r = x;
        e = geterror(x, old);
        if (e < eps) {
          const er = e;
          ans = x;
          ar1.push(ans);
          ar2.push(er);

          break;
        }
      } else {
        old = l;
        l = x;
        e = geterror(x, old);
        if (e < eps) {
          const er = e;
          ans = x;
          ar1.push(ans);
          ar2.push(er);
          break;
        }
      }
      const er = e;
      ans = x;
      ar1.push(ans);
      ar2.push(er);
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
        break;
      }
      if(i>1000){
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
export default FalsePosition;