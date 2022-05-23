import Formcomponent from "../Formcomponent"
import {recur,resetv} from "./Newtondivide"
const Lagrange = (interx,intery,x,ar) =>{
    let result =0;
    for(let i = 0;i<ar.length;i++){
        let temp1 = 1,temp2=1;
        for(let j=0;j<ar.length;j++){
            if(ar[j]!==ar[i]){
                temp1*=(interx[ar[j]]-x)
                temp2*=(interx[ar[j]]-interx[ar[i]])
            }
        }
        result+=intery[ar[i]]*(temp1/temp2)
    }
    return (
        result
        )
}
export default Lagrange