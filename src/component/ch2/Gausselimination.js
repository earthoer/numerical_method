import Formcomponent from "../Formcomponent";
import { evaluate,parse,sqrt,abs,derivative,format,matrix,det,multiply,subset,index,row,column,transpose,concat,zeros} from "mathjs";
const Gausseliminate = (equation,equationans)=>{
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
            console.log(temp)
            console.log(temp2)
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
            console.log(temp3)
            console.log(mat)
            mat[i] =JSON.parse(JSON.stringify(temp3))
            
            console.log(temp3)
        }
        console.log(mat)
    }
    console.log(mat)
    let ar =[]
    ar = Object.keys(mat).map((e) => Number(0));
    let z =mat.length
    
    for(let i  =mat.length-1;i>-1;i--){
        let sum = 0;
        // console.log(mat[i])
        if(i ===mat.length-1){
            ar[mat.length-1]=mat[i][mat.length]/mat[i][mat.length-1]
            
        }
        else{
            for(let j  = mat.length-1;j>-1+z;j--){
                // console.log(ar[j]," ",mat[i][j])
                mat[i][j] = ar[j]*mat[i][j]
            }   
            for(let j  = mat.length-1;j>z-1;j--){
                // console.log(mat[i][j])
                sum += mat[i][j]
            }
    
            ar[z-1]=(mat[i][mat.length]-sum)/mat[i][z-1]
            // console.log(mat[i][mat.length]," - ",sum," / ",mat[i][z-1] )
            

        }

        z--;
    }   
    return (
        ar
        )
}
export default Gausseliminate;