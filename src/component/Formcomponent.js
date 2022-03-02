import { useState,useEffect, createElement } from "react";
import { evaluate,parse,sqrt,abs,derivative,format,matrix,det,multiply,subset,index,row,column} from "mathjs";
// import 'Formcomponent.css'
import './Formcomponent.css'
// import '../../App.css'
import Chart from "./Chartcomponent";
import Newtonraphson from "./ch1/Newtonraphson";
import Select from 'react-select'
import {MathJax,MathJaxContext} from "better-react-mathjax"

const Formcomponent = (states) => {
  const [equation, setEquation] = useState("");
  const [left, setleft] = useState("");
  const [right, setright] = useState("");
  const [answer, setanswer] = useState([]);
  const [error, seterror] = useState([]);
  const [fx, setfx] = useState([]);
  const [xcount, setxcount] = useState(0);
  const [arans, setarans] = useState([]);
  const inputxcount = (e) => {
    setxcount(e.target.value);
  };
  const inputeq = (e) => {
    setEquation(e.target.value);
  };
  const inputleft = (e) => {
    setleft(e.target.value);
  };
  const inputright = (e) => {
    setright(e.target.value);
  };
  const [equationans, setEquationans] = useState("");
  const [equation2, setEquation2] = useState("");
  const [answer1, setanswer1] = useState("");
  const [answer2, setanswer2] = useState("");
  const inputeqans = (e) => {
    setEquationans(e.target.value);
  };

  let leftinput = "";
  let rightinput = "";
  let ar1 = [];
  let ar2 = [];
  let ar3 = [];
  // console.log(data)
  if (String.prototype.splice === undefined) {
    /**
     * Splices text within a string.
     * @param {int} offset The position to insert the text at (before)
     * @param {string} text The text to insert
     * @param {int} [removeCount=0] An optional number of characters to overwrite
     * @returns {string} A modified string containing the spliced text.
     */
    String.prototype.splice = function (offset, text, removeCount = 0) {
      let calculatedOffset = offset < 0 ? this.length + offset : offset;
      return (
        this.substring(0, calculatedOffset) +
        text +
        this.substring(calculatedOffset + removeCount)
      );
    };
  }
  function geterror(x, y) {
    return abs((x - y) / x);
  }
  function getfalsepos(xl, xr, fxl, fxr) {
    return (xl * fxr - xr * fxl) / (fxr - fxl);
  }
  const dimentions = (e) => {
    console.log("test select dimention : ", e.value);
  };
  let st = JSON.stringify(Object.values(states));
  st = st.slice(2, -2);

  let ep = 1;
  if (
    st === "bisection" ||
    st === "falseposition" ||
    st === "onepoint" ||
    st === "newtonraphson"
  ) {
    ep = 1;
  } else {
    ep = 2;
  }
  if (ep === 1) {
    if (document.getElementById("l")) {
      if (st === "bisection") {
        leftinput = "ใส่ค่าด้านซ้าย";
        rightinput = "ใส่ค่าด้านขวา";
      } else if (st === "falseposition") {
        leftinput = "ใส่ค่าด้านซ้าย";
        rightinput = "ใส่ค่าด้านขวา";
      } else if (st === "onepoint") {
        console.log("st  :      ", st);
        leftinput = "ใส่ค่าเริ่มต้น";
      } else if (st === "newtonraphson") {
        console.log("st  :      ", st);
        leftinput = "ใส่ค่าเริ่มต้น";
      }
    }
  } else if (ep === 2) {
    // console.log(ep);
    if (document.getElementById("ans")) {
      let holder = document.getElementById("ans");
      holder.innerHTML = "";
      for (let i = 0; i < answer.length; i++) {
        let a = i+1
        holder.innerHTML += "x"+a+" = "+JSON.parse(answer[i]).toFixed(6) + "<br>";
      }
    }
  }
// console.log(st)
  const checkmultierror = (ar,eps)=>{
    for(let i = 0;i<ar.length;i++){
      
      if(ar[i]>eps){
        // console.log(ar[i])
        return true;
      }
    }
    return false;
  }
  const onSubmitf = (event) => {
    event.preventDefault();
    setanswer([])
    let e = 100000;
    let eps = 0.000001;
    let old = 0;
    let ans = 0;
    let i = 0;
    let temp = 0;
    let state = 0;
    if (st === "bisection") {
      let l = Number(left);
      let r = Number(right);
      console.log("bisection");
      if (equation.length > 0 && left.length > 0 && right.length > 0) {
        try {
          let eq = "";
          let eqt;

          if (equation.indexOf("x") < 0) {
            if (equation[0] === "-") {
              let teq = equation.substring(1);
              teq = teq.splice(0, "(").splice(teq.length + 1, ")");
              eq = "x+" + teq;
            } else {
              let teq = equation;
              teq = teq.splice(0, "(").splice(teq.length + 1, ")");
              console.log(teq);
              eq = "x-" + teq;
            }
            eqt = parse(eq);
          } else {
            eqt = parse(equation);
          }
          // console.log(eqt.toString())

          while (e > eps) {
            let mid = (l + r) / 2;
            let fm = eqt.evaluate({ x: mid });
            let fl = eqt.evaluate({ x: l });
            let fr = eqt.evaluate({ x: r });

            const data = [
              { mid: mid },
              { "f(m)": fm },
              { r: r },
              { "f(r)": fr },
              { l: l },
              { "f(l)": fl },
              { e: e },
              { "fr*fm": fm * fr },
            ];
            // console.log(data)
            if (fr * fm > 0) {
              old = r;
              r = mid;
              e = geterror(mid, old);
              // e= e.im

              if (e < eps) {
                console.log("case 1");
                break;
              }
            } else {
              old = l;
              l = mid;
              e = geterror(mid, old);
              // e=e.im
              if (e < eps) {
                console.log("case 2");
                break;
              }
            }
            const er = e;
            ans = mid;

            ar1.push(ans);
            ar2.push(er);
            ar3.push(fm);
            // console.log("i  : ",i,"state : ",state ,"from e-temp",abs(e-temp))
            if (i > 0) {
              if (abs(er - temp) < 0.00005) {
                state += 1;
              } else {
                state = 0;
              }
              temp = er;
            }
            i++;

            if (state >= 5) {
              console.log("case 3");
              break;
            }
          }

          setanswer(ar1);
          seterror(ar2);
          setfx(ar3);
        } catch (e) {
          console.log(e);
        }
      }
    } else if (st === "falseposition") {
      let l = Number(left);
      let r = Number(right);
      console.log("falseposition");
      if (equation.length > 0 && left.length > 0 && right.length > 0) {
        try {
          let eq = "";
          let eqt;

          if (equation.indexOf("x") < 0) {
            if (equation[0] === "-") {
              let teq = equation.substring(1);
              // teq = [teq.slice(0,1),'(',teq.slice(1).join('')]
              teq = teq.splice(0, "(").splice(teq.length + 1, ")");
              eq = "x+" + teq;
            } else {
              let teq = equation;
              teq = teq.splice(0, "(").splice(teq.length + 1, ")");
              // console.log(teq)

              eq = "x-" + teq;
            }
            eqt = parse(eq);
          } else {
            eqt = parse(equation);
          }

          // console.log(eqt.toString())
          while (e > eps) {
            let mid = (l + r) / 2;
            let fm = eqt.evaluate({ x: mid });
            let fl = eqt.evaluate({ x: l });
            let fr = eqt.evaluate({ x: r });
            let x = getfalsepos(l, r, fl, fr);
            let fx = eqt.evaluate({ x: x });
            const data = [
              { "f(m)": fm },
              { r: r },
              { "f(r)": fr },
              { l: l },
              { "f(l)": fl },
              { x: x },
              { fx: fx },
              { e: e },
              { "fr*fm": fm * fr },
            ];
            // console.log(data)
            if (fx * fr > 0) {
              old = l;
              r = x;
              e = geterror(x, old);
              // e= e.im

              if (e < eps) {
                console.log("case 1");
                const er = e;
                ans = x;
                ar1.push(ans);
                ar2.push(er);
                ar3.push(fx);
                break;
              }
            } else {
              old = r;
              r = x;
              e = geterror(x, old);
              // e=e.im
              if (e < eps) {
                console.log("case 2");
                const er = e;
                ans = x;
                ar1.push(ans);
                ar2.push(er);
                ar3.push(fx);
                break;
              }
            }
            const er = e;
            ans = x;
            const d = [{ e: er }, { ans: ans }];
            // console.log(d)
            ar1.push(ans);
            ar2.push(er);
            ar3.push(fx);
            if (i > 0) {
              if (abs(er - temp) < 0.00005) {
                state += 1;
              } else {
                state = 0;
              }
              temp = er;
            }
            i++;
            if (state >= 5) {
              console.log("case 3");
              break;
            }
          }
          setanswer(ar1);
          seterror(ar2);
          setfx(ar3);
        } catch (e) {
          console.log(e);
        }
      }
    } else if (st === "onepoint") {
      console.log(st);
      try {
        // console.log("eq : ",equation)
        if (equation.length > 0) {
          let eq = "";
          let eqt;
          if (equation.indexOf("x") < 0) {
            console.log("not x ");
            console.log(equation.indexOf("x") > 0);
            if (equation[0] === "-") {
              let teq = equation.substring(1);
              teq = teq.splice(0, "(").splice(teq.length + 1, ")");
              eq = "x+" + teq;
            } else {
              let teq = equation;
              teq = teq.splice(0, "(").splice(teq.length + 1, ")");
              // console.log(teq)
              eq = "x-" + teq;
            }
            eqt = parse(eq);
          } else {
            console.log(equation.indexOf("x"));
            eqt = parse(equation);
          }

          // setleft(0)
          // setright(0)
          const l = left;
          let x = parseFloat(l);
          console.log(eqt.toString());
          while (e > eps) {
            console.log(x);
            old = x;
            x = eqt.evaluate({ x: x });
            e = geterror(x, old);

            const er = e;
            ans = old;
            if (i > 0) {
              if (abs(er - temp) < 0.00005) {
                state += 1;
              } else {
                state = 0;
              }
              temp = er;
            }
            i++;
            if (state >= 5) {
              console.log("case 3");
              break;
            }
            ar1.push(ans);
            ar2.push(e);
            if (i == 1000) {
              break;
            }
          }
          setanswer(ar1);
          seterror(ar2);
        }
      } catch (e) {
        console.log(e);
      }
    } else if (st === "newtonraphson") {
      console.log(st);
      try {
        console.log("eq : ", equation);
        if (equation.length > 0) {
          let eq = "";
          let eqt;
          if (equation.indexOf("x") < 0) {
            if (equation[0] === "-") {
              let teq = equation.substring(1);
              teq = teq.splice(0, "(").splice(teq.length + 1, ")");
              eq = "x+" + teq;
            } else {
              let teq = equation;
              teq = teq.splice(0, "(").splice(teq.length + 1, ")");
              console.log(teq);
              eq = "x-" + teq;
            }
            eqt = parse(eq);
          } else {
            eqt = parse(equation);
          }
          console.log(eqt.toString());
          let s = Number(left);
          let x = s;
          let div = derivative(eqt, "x");
          console.log("div : ", div.toString());
          let deltax = -(eqt.evaluate({ x: x }) / div.evaluate({ x: x }));
          let newx = x + deltax;
          e = geterror(newx, x);
          x = newx;
          ar1.push(x);
          ar2.push(e);
          const data = [{ x: x }, { deltax: deltax }, { e, e }];
          // console.log(data)
          while (e > eps) {
            deltax = -(eqt.evaluate({ x: x }) / div.evaluate({ x: x }));
            newx = x + deltax;
            e = geterror(newx, x);
            x = newx;
            ans = x;
            const data = [{ x: x }, { deltax: deltax }, { e, e }];
            console.log(data);
            const er = e;
            if (i > 0) {
              if (abs(er - temp) < 0.00005) {
                state += 1;
              } else {
                state = 0;
              }
              temp = er;
            }
            i++;
            if (state >= 5) {
              console.log("case 3");
              break;
            }
            ar1.push(ans);
            ar2.push(e);
            if (i == 1000) {
              break;
            }
          }
          setanswer(ar1);
          seterror(ar2);
        }
      } catch (e) {
        console.log(e);
      }
    } else if (ep === 2) {
      // setarans(arrans)
      document.getElementById("ans").innerHTML =""
      if (st == "cramer") {
        console.log(st)
        try {
          let eq = JSON.parse(equation);
          const eqans = JSON.parse(equationans);
          const mata = matrix(eq);
          const matb = matrix(eqans);
          let contain = [];
          let rows = mata.size()[0];
          let columns = mata.size()[1];
          console.log("row : ", rows, " column : ", columns);
          console.log(mata.toString());
          let deta = det(mata);
          let ar = []
          for (let i = 0; i < rows; i++) {
            let matc = JSON.parse(JSON.stringify(eq));
            for (let j = 0; j < columns; j++) {
              matc[j][i] = eqans[j];

            }

            let rmatc = matrix(matc);
            let detc = det(rmatc)
            console.log("deta",deta)
            console.log('detc',detc)
            let ans = deta/detc
            ar.push(ans)
            console.log(rmatc.toString());
           
          }
          
          setanswer(ar)
          console.log("size of answer : ",answer.length)
          console.log("answer  : ",ar)
        } catch (e) {
          console.log(e);
        }
      }
      else if(st=="gauseeliminate"){
        console.log(st)
        let eq = JSON.parse(equation);
        const eqans = JSON.parse(equationans);
        const mata = matrix(eq);
        const matb = matrix(eqans);
      }
      else if(st==="gaussjordan"){
        console.log(st)
      }
      else if(st==="jacobi"){
        console.log(st)
        let eq = JSON.parse(equation);
        const eqans = JSON.parse(equationans);
        let error = new Array(eq[0].length).fill(100)
        let x = JSON.parse("["+left+"]");
        console.log(error)
        while(checkmultierror(error,eps)){

          let xn = new Array(eq[0].length).fill(0)
          for(let i  =0 ;i<eq.length;i++){
            xn[i]=eqans[i]
            for(let j = 0;j<eq[0].length;j++){
              if(i!==j){
                xn[i]-=(eq[i][j]*x[j])
              }
            }
            xn[i]/=eq[i][i]
            error[i]=geterror(xn[i],x[i])

          }
          x =JSON.parse(JSON.stringify(xn))
          
        }
        console.log(x.toString())
        setanswer(x)
      }
      else if(st==="seidal"){
        console.log(st)
        let eq = JSON.parse(equation);
        const eqans = JSON.parse(equationans);
        let error = new Array(eq[0].length).fill(100)
        let x = JSON.parse("["+left+"]");
        console.log(error)
        while(checkmultierror(error,eps)){
          let xn = new Array(eq[0].length).fill(0)
          for(let i  =0 ;i<eq.length;i++){
            xn[i]=eqans[i]
            for(let j = 0;j<eq[0].length;j++){
              if(j<i){
                xn[i]-=(xn[j]*eq[i][j])
              }
              else if(i!==j){
                xn[i]-=(eq[i][j]*x[j])
              }
            }
            xn[i]/=eq[i][i]

            error[i]=geterror(xn[i],x[i])

          }
          x =JSON.parse(JSON.stringify(xn))
          // console.log(x.toString())
          
        }
        console.log(x.toString())
        setanswer(x)
      }
    }
  };
  const data = [];
  let datae = [];
  const datafx = [];
  useEffect(() => {
    setanswer([]);
    seterror([]);
    setfx([]);
  }, [equation, left, right]);

  for (let i = 0; i < answer.length; i++) {
    data.push({ y: JSON.parse(JSON.stringify(answer[i].toFixed(6))), x: i + 1 });
    // answer[i] = Number(Number(answer[i]).toFixed(6) );
  }
  // [{1.2,1},{1.3,2}]
  // console.log(answer)

  for (let i = 0; i < error.length; i++) {
    datae.push({ y: error[i], x: i + 1 });
  }
  for (let i = 0; i < fx.length; i++) {
    datafx.push({ y: fx[i], x: i + 1 });
  }
  const options = [
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
  ];
  const mt = (eq) => {
    try {
      return (
        <td>
          <nobr>
            <MathJax dynamic>
              {"\\(" +
                parse(eq.toString().replace(/\r/g, "")).toTex({
                  parenthesis: "keep",
                  implicit: "show",
                }) +
                "\\)"}
            </MathJax>
          </nobr>
        </td>
      );
    } catch (e) {
      return <MathJax dynamic>{e.toString}</MathJax>;
    }
  };
  
  return (
    <div align="center" className="form">
      {/* <MathComponent tex={String.raw`\int_0^1 x^2\ dx`} /> */}

      {ep === 1 && (
        <div>
          <MathJaxContext>
            <p>
              Question : {mt(equation)} Answer: {answer[answer.length - 1]}
            </p>
          </MathJaxContext>
          <p> error: {error[error.length - 1]}</p>
          <form onSubmit={onSubmitf} id="roote">
            <div>
              <label>ใส่สมการ </label>
              <input type="text" onChange={inputeq} />
            </div>

            <div align="center">
              <div id="l">
                <label>{leftinput}</label>
                <input type="text" onChange={inputleft} />
              </div>
              {st !== "newtonraphson" && st !== "onepoint" && (
                <div id="r">
                  <label>{rightinput}</label>
                  <input type="text" onChange={inputright} />
                </div>
              )}
            </div>

            <button type="submit">submit</button>
          </form>
          <div className="chart">
          <Chart dataans={data} dataerror={datae} datafx={datafx}></Chart>
        </div>
        </div>
        
      )}
      {ep === 2 && (
        <div>
          <MathJaxContext>
            <p>
              Question : {mt(equation)} ,{mt(equationans)} Answer:<p id ="ans"></p>
              
              
            </p>
          </MathJaxContext>
          <p> error: {error[error.length - 1]}</p>
          <form onSubmit={onSubmitf} id="linear">
            {/* <Select options={options} className="select" onChange={dimentions}/> */}
            <div>
              <label>ใส่เมททริก A</label>
              <input type="text" onChange={inputeq} />
            </div>
            <div>
              <label>ใส่เมททริก B</label>
              <input type="text" onChange={inputeqans} />
            </div>
            {(st ==="jacobi"||st==="seidal")&&
              <div>
                <label>ใส่ค่าเริ่มต้นขั้นด้วย ,</label>
                <input type="text" onChange={inputleft} />
              </div>}
            <br />
            <button type="submit">submit</button>
          </form>
        </div>
      )}
      {(st==="jacobi"||st==="seidal")&&
      <div className="chart">
      <Chart dataans={data} dataerror={datae} datafx={datafx}></Chart>
    </div>}
    </div>
  );
};
export default Formcomponent;
