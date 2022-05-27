
const Checkmultierror = (ar,eps)=>{
    for(let i = 0;i<ar.length;i++){
      
        if(ar[i]>eps){
          // 
          return true;
        }
      }
      return false;
}
export default Checkmultierror;