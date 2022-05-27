import Formcomponent from "../Formcomponent";
import { evaluate,parse,sqrt,abs,derivative,format,matrix,det,multiply,subset,index,row,column,transpose, ConditionalNodeDependencies} from "mathjs";
const LU = (eq, eqans) => {
  // 
  
  const mat = JSON.parse(eq)
  const mat2 = JSON.parse(eqans)
  let n = mat[0].length;
//   
let Lower = Array(mat.length).fill(0).map(x=>Array(mat[0].length).fill(0));
let Upper = Array(mat.length).fill(0).map(x=>Array(mat[0].length).fill(0));
    for(let A = 0;A<mat.length;A++)
        {
            for(let B = A;B<mat[0].length;B++)
            {
                let sum = 0;
                for(let C=0;C<A;C++)
                {
                    sum+= (Lower[A][C]*Upper[C][B]);
                }
                Upper[A][B] = mat[A][B] - sum;
            }
            for(let B = A;B<mat[0].length;B++)
            {
                if(A===B)
                {
                    Lower[A][A] = 1;
                }
                else
                {
                    let sum = 0;
                    for(let C=0;C<A;C++)
                    {
                        sum+= (Lower[B][C]*Upper[C][A]);
                    }
                    Lower[B][A] = (mat[B][A] - sum )/Upper[A][A];
                }
            }
        }

  //  
  // Setw is for displaying nicely
  //do ly =B
  let Y = Array(mat.length).fill(0);
  let X = Array(mat.length).fill(0);
  
  for (let i = 0; i < mat.length; i++) {
    let sum = 0;
    for (let j = 0; j < mat[0].length; j++) {
      if (j !== i) {
        sum += Lower[i][j] * Y[j];
      }
    }
    Y[i] = (mat2[i] - sum) / Lower[i][i];
  }
  for (let i = mat.length - 1; i >= 0; i--) {
    let sum = 0;
    for (let j = 0; j < mat[0].length; j++) {
      if (j !== i) {
        sum += Upper[i][j] * X[j];
      }
    }
    X[i] = parseFloat(((Y[i] - sum) / Upper[i][i]).toPrecision(15));
  }
  // 
  return X;
};
export default LU;