import "./Proof.css"
import {MathJax,MathJaxContext} from "better-react-mathjax"
import { evaluate,parse,sqrt,abs,derivative,format,matrix,det,multiply,subset,index,row,column,transpose, ConditionalNodeDependencies} from "mathjs";
const Proof = (eq)=>{
    console.log(eq)
    let equation 
    eq.st==="onepoint"? equation = parse(eq.eq.replace("x","(x)")+"-(x)"): equation = parse(eq.eq.replace("x","(x)"))
    

    const mt = (eq) => {
        try {
          return (
                <MathJax dynamic inline>
                  {"\\(" +
                    parse(eq.toString().replace(/\r/g, "")).toTex({
                      parenthesis: "keep",
                      implicit: "show",
                    }) +
                    "\\)"}
                </MathJax>
          );
        } catch (e) {
          return <MathJax dynamic>{e.toString}</MathJax>;
        }
      };
      console.log(eq.st)
    return (
        <div>
          {eq.st==="onepoint"&&(<div className="Proof">
          <h3>Proof</h3>
            <h4>Equation : <MathJaxContext>{mt(eq.eq)}</MathJaxContext> <br/>old form of equation : <MathJaxContext>{mt(eq.eq+"-x")}</MathJaxContext><br/>x: {eq.x} <br/>f(x) = {equation.evaluate({x:eq.x})} <br/>more close to zero more accurate</h4>
          </div>)}
        {eq.st!=="onepoint"&&(<div>
          <div className="Proof">
            <h3>Proof</h3>
            <h4>Equation : <MathJaxContext>{mt(eq.eq)}</MathJaxContext> <br/>x: {eq.x} <br/>f(x) = {equation.evaluate({x:eq.x})} <br/>more close to zero more accurate</h4>
        </div>
        </div>)}
        </div>
        
        )
}
export default Proof;