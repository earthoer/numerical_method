import Formcomponent from "../Formcomponent"
let Mem = Array.from(Array(100),()=>Array(100).fill(0));
const resetv = ()=>{
    Mem = Array.from(Array(100),()=>Array(100).fill(0));
}
const recur =(interx,intery,point,l,r)=>{
    // 
    // 
    if(l-r===0){
        return intery[point[l]]
    }
    else if(Mem[l][r]!==0){
        // 
        return Mem[l][r]
    }
    else{
        Mem[l][r]=((recur(interx,intery,point,l,r+1)-recur(interx,intery,point,l-1,r))/(interx[point[l]]-interx[point[r]]))
        // 
        return Mem[l][r]
    }
}
const Newtondivide = (interx,intery,x,ar) =>{
    // 
    resetv()
    let temp = 0
    for(let i = 0;i<ar.length;i++){
        let temp2 = 1;
        for(let j = 0;j<i;j++){
          temp2 = temp2*(x-interx[ar[j]])
        }
        // 
        temp+=recur(interx,intery,ar,i,0)*temp2
        
      }
    // 
    return (
        temp
    )
}
export default Newtondivide