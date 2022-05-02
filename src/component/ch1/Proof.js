import "./Proof.css"
import {MathJax,MathJaxContext} from "better-react-mathjax"
import { evaluate,parse,sqrt,abs,derivative,format,matrix,det,multiply,subset,index,row,column,transpose, ConditionalNodeDependencies} from "mathjs";
const Proof = (eq)=>{
    console.log(eq)
    const equation = parse(eq.eq.replace("x","(x)"))

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
    return (
        <div className="Proof">
            <h3>Proof</h3>
            <h4>Equation : <MathJaxContext>{mt(eq.eq)}</MathJaxContext> <br/>x: {eq.x} <br/>f(x) = {equation.evaluate({x:eq.x})} <br/>more close to zero more accurate</h4>
        </div>)
}
export default Proof;