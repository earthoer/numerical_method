import Formcomponent from "../Formcomponent";
import { subtract,evaluate,parse,sqrt,abs,derivative,format,matrix,det,multiply,subset,index,row,column,add,transpose,divide} from "mathjs";

const Conjugate = (equation,equationans,x)=>{
    function getr(mata,matx,matb){
        // console.log("matx : "+parse(matx.toString()))
        return subtract(multiply(mata,matx),matb)
    }
    function getdelta(d,r,mata){
        return multiply(divide(multiply(transpose(d),r),multiply(multiply(transpose(d),mata),d)),-1)
    }
    function getx(matx,delta,d){
        return add(matx,multiply(delta,d))
    }
    function getalpha(r,mata,d){
        return divide(multiply(multiply(transpose(r),mata),d),multiply(multiply(transpose(d),mata),d))
    }
    function getd(r,alpha,d){
        return add(multiply(r,-1),multiply(alpha,d))
    }
    let ar =[]
    let k = 0;
    let eq = JSON.parse(equation);
    const eqans = JSON.parse(equationans);
 
    let xx = JSON.parse("["+x+"]");
    const eps =  0.000001
    let mata = matrix(eq)
    let matx = matrix(xx)
    let matb = matrix(eqans)
    let r = getr(mata,matx,matb)
    let d = multiply(r,-1)
    let data =[]
    
    let delta = getdelta(d,r,mata)
    matx = getx(matx,delta,d)
    data.push(matx.toString())
    r = getr(mata,matx,matb) 
    let error = sqrt(multiply(transpose(r),r))
    let errordata = [error]
    let alpha = getalpha(r,mata,d)
    d = getd(r,alpha,d)
    

    while(error>eps){
        k++;
        delta = getdelta(d,r,mata)
        matx = getx(matx,delta,d)
        data.push(matx.toString())
        r = getr(mata,matx,matb)
        error = sqrt(multiply(transpose(r),r))
        errordata.push(error)
        alpha = getalpha(r,mata,d)
        d = getd(r,alpha,d)

    }
    // console.log(matx.data[0])
    ar.push(matx.toString())
    ar.push(data)
    ar.push(errordata)
    return (
        ar
        )
}
export default Conjugate;