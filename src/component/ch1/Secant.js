import { evaluate,parse,sqrt,abs,derivative,format,matrix,det,multiply,subset,index,row,column,transpose, ConditionalNodeDependencies} from "mathjs";
import { ContextExclusionPlugin } from "webpack";

const Secant =(eq,x0,x1)=>{
    // 
    const Question = parse(eq)
    
    let Result_loop = [];
    let Error = [];
    let x_o = x0,x = x1
    Result_loop.push(x);

    Error.push(abs((x-x_o)/x))

    while(abs((x-x_o)/x)>0.000001)
    { 
        // 
        let fx0 = Question.evaluate({x:x_o})
        let fx1 = Question.evaluate({x:x})
        
        let cal = x-(fx1/((fx0-fx1)/(x_o-x)));
        x_o = x;
        x = cal
        
        Result_loop.push(x)
        Error.push(abs((x-x_o)/x))
    }

    
    return 500
}
export default Secant