import Formcomponent from "../Formcomponent";
import { evaluate,parse,sqrt,abs,derivative,format,matrix,det,multiply,subset,index,row,column,transpose,concat,zeros} from "mathjs";
const GaussJordan = (equation,equationans)=>{
    let eq =  JSON.parse(equation)
    let eqans =  JSON.parse(equationans)
    // let t =  JSON.parse(JSON.stringify(eq[0]))
    // console.log(eq)
    eqans = [eqans]
    console.log(JSON.parse(JSON.stringify(eqans)))
    console.log(JSON.parse(JSON.stringify(concat(eq,transpose(eqans)))))
    let mat  = concat(eq,transpose(eqans))
    console.log(mat)
    for(let k =0;k<mat.length-1;k++){
        for(let i  =k+1;i<mat.length;i++){
            let temp = []
            let temp2 = []
            let temp3 = []
            for(let j=0;j<mat[0].length;j++){
                temp.push(mat[k][j]*mat[i][0+k])
                temp2.push(mat[i][j]*mat[k][0+k])
                
            }
            if((temp[k+0]<0&&temp2[k+0]<0)||(temp[k+0]>0&&temp2[k+0]>0)){
                for(let l = 0;l<temp.length;l++){
                    console.log(temp[l]-temp2[l],-1)
                    temp3.push(temp[l]-temp2[l])
                }
            }
            
            else{
                for(let l = 0;l<temp.length;l++){
                    console.log(temp[l]+temp2[l])
                    temp3.push(temp[l]+temp2[l])
                } 
            }
            // console.log(temp3)
            // console.log(mat)
            mat[i] =JSON.parse(JSON.stringify(temp3))
            
            // console.log(temp3)
        }
        // console.log(mat)
    }
    console.log(mat)
    let  count = 1;
    let temp  =[]
    let temp2 =[]
    let temp3 =[]
    for(let k = mat.length-2;k>-1;k--){
        console.log("round")
        
       for(let i = 0;i<count;i++){
        temp  =[]
        temp2 =[]
        temp3 =[]
           console.log(mat[k][(mat.length-1)-i]," : ",mat[mat.length-1-i][mat.length-i-1])
           for(let j = 0;j<mat.length+1;j++){
               temp.push(mat[k][j]*mat[mat.length-1-i][mat.length-i-1])
               temp2.push(mat[mat.length-1-i][j]*mat[k][(mat.length-1)-i])
           }
           if((temp[mat.length-1-i]>0&&temp2[mat.length-1-i]>0)||(temp[mat.length-1-i]<0&&temp2[mat.length-1-i]<0)){
               for(let j = 0;j<temp.length;j++){
                   temp3.push(temp[j]-temp2[j])
               }
           }
           else{
            for(let j = 0;j<temp.length;j++){
                temp3.push(temp[j]+temp2[j])
            }
           }
           mat[k] = temp3
       }
       count++;
    }
    let ans = []
    for(let i =  0;i<mat.length;i++){
        for(let j = 0;j<mat.length;j++){
            if(i===j){
                console.log(mat[i][j])
                ans.push(mat[i][mat.length]/mat[i][j])
            }
        }
    }
    console.log(mat)
    return (
       ans
        )
}
export default GaussJordan;