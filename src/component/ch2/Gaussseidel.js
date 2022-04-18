import Formcomponent from "../Formcomponent";
import { evaluate,parse,sqrt,abs,derivative,format,matrix,det,multiply,subset,index,row,column,transpose, ConditionalNodeDependencies} from "mathjs";
import Checkmultierror from './../Checkmultierror'
function geterror(x, y) {
    return abs((x - y) / x);
  }

const Gaussseidal = (equation, equationans, left) => {
  let eq = JSON.parse(equation);
  let eps = 0.000001;
  const eqans = JSON.parse(equationans);
  let error = new Array(eq[0].length).fill(100);
  let x = JSON.parse("[" + left + "]");
  let ar = [];
  let er = [];
  while (Checkmultierror(error, eps)) {
    let xn = new Array(eq[0].length).fill(0);

    for (let i = 0; i < eq.length; i++) {
      xn[i] = eqans[i];
      for (let j = 0; j < eq[0].length; j++) {
        if (j < i) {
          xn[i] -= xn[j] * eq[i][j];
        } else if (i !== j) {
          xn[i] -= eq[i][j] * x[j];
        }
      }
      xn[i] /= eq[i][i];

      error[i] = geterror(xn[i], x[i]);
    }
    er.push(JSON.parse(JSON.stringify(error)));
    ar.push(xn);
    x = JSON.parse(JSON.stringify(xn));
  }
  let re = [];
  re.push(ar);
  re.push(er);
  re.push(x);
  return re;
};
export default Gaussseidal;