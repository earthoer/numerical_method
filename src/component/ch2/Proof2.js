import "./Proof2.css"
import {MathJax,MathJaxContext} from "better-react-mathjax"
import ReactDOM from 'react-dom'
import { evaluate,parse,sqrt,abs,derivative,format,matrix,det,multiply,subset,index,row,column,transpose, ConditionalNodeDependencies} from "mathjs";
const Proof2 = (eq)=>{
    
    // const equation = parse(eq.eq.replace("x","(x)"))
    let x = "["
    for(let i = 0;i<JSON.parse(eq.equation).length;i++){
      x+="x,"
    }
    x= x.slice(0,-1)
    x+="]"
    let ar=[]
    
    const equation = JSON.parse(eq.equation)
   try{
    let html = []
    let holder =  document.getElementById("sol")
    for(let j = 0;j<equation.length;j++){
      let str = ""
      for(let i = 0 ;i<equation[0].length;i++){
        str+="("+equation[j][i]+"*"+eq.ans[i]+")+"
        // 
      }
      str = str.slice(0,-1)
      html.push(<p>{str} = {evaluate(str)}<br/></p>)
      // ar.push(str)
    }
    
    ReactDOM.render(html,holder)
   }
   catch (e){

   }
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
        <div className="Proof2">
            <h3>Proof</h3>
            <h2>AX =B</h2>
            <h4>Equation : <MathJaxContext>{mt(eq.equation)} {mt(x)} =  {mt(eq.equationans)}</MathJaxContext> 
            <br/>
            <br/><MathJaxContext>{mt(eq.equation)} {mt(JSON.stringify(eq.ans))} =  {mt(eq.equationans)}</MathJaxContext> 
            <br/> <p id ="sol"></p>
            <br/>more close to B more accurate</h4>
        </div>)
}
export default Proof2;