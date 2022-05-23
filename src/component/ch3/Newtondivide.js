import Formcomponent from "../Formcomponent"
let Mem = Array.from(Array(100),()=>Array(100).fill(0));
const resetv = ()=>{
    Mem = Array.from(Array(100),()=>Array(100).fill(0));
}
const recur =(interx,intery,point,l,r)=>{
    // console.log(Mem[0])
    // console.log("interx : ",interx," intery : ",intery," x : ",x," point : ",point," l : ",l," r : ",r )
    if(l-r===0){
        return intery[point[l]]
    }
    else if(Mem[l][r]!==0){
        // console.log("test")
        return Mem[l][r]
    }
    else{
        Mem[l][r]=((recur(interx,intery,point,l,r+1)-recur(interx,intery,point,l-1,r))/(interx[point[l]]-interx[point[r]]))
        // console.log("else : ",interx[point[l]])
        return Mem[l][r]
    }
}
const Newtondivide = (interx,intery,x,ar) =>{
    // console.log(interx,intery,x,ar)
    resetv()
    let temp = 0
    for(let i = 0;i<ar.length;i++){
        let temp2 = 1;
        for(let j = 0;j<i;j++){
          temp2 = temp2*(x-interx[ar[j]])
        }
        // console.log(temp)
        temp+=recur(interx,intery,ar,i,0)*temp2
        
      }
    // console.log(temp)  
    return (
        temp
    )
}
export default Newtondivide