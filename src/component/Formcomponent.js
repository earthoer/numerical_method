import { useState,useEffect, createElement,useRef } from "react";
import { evaluate,parse,sqrt,abs,derivative,format,matrix,det,multiply,subset,index,row,column,transpose, ConditionalNodeDependencies} from "mathjs";
import './Formcomponent.css'
import Chart from "./Chartcomponent";
import Select from 'react-select'
import {MathJax,MathJaxContext} from "better-react-mathjax"
import Bisection from "./ch1/Bisection";
import FalsePosition from "./ch1/FalsePosition";
import OnePoint from "./ch1/OnePoint";
import Newtonraphson from "./ch1/Newtonraphson";
import CramerRule from "./ch2/CramerRule"
import Gausseliminate from "./ch2/Gausselimination";
import GauseJordan from "./ch2/GaussJordan";
import Jacobi from "./ch2/Jacobi";
import Gaussseidal from "./ch2/Gaussseidel";
import Conjugate from "./ch2/Conjugate";
import Lagrange from './ch3/Lagrange'
import Checkmultierror from './Checkmultierror'
import ReactDOM from 'react-dom'
import React from 'react'
import Chartcomponent from "./Chartcomponent";
import Chartcomponent2 from "./Chartcomponent2";
import Dropd from "react-dropd"
const Formcomponent = (states) => {
  const [equation, setEquation] = useState("");
  const [left, setleft] = useState("");
  const [right, setright] = useState("");
  const [answer, setanswer] = useState([]);
  const [error, seterror] = useState([]);
  const [fx, setfx] = useState("");
  const [row, setrow] = useState(0);
  const [column, setcolumn] = useState(0);
  const [arans, setarans] = useState([]);
  const [arerr, seterr] = useState([]);
  const [mat,setmat] = useState([]);
  const [mat2,setmat2] = useState([]);
  const [temp,settemp] = useState("")
  const [artemp,setartemp] = useState([]);
  const [artemp2,setartemp2] = useState([]);
  const [interx,setinterx] = useState([])
  const [intery,setintery] = useState([])
  const [item,setitem] = useState([])
  const itemref = useRef(item)
  const [exeq,setexeq] = useState([]);
  const exeqref = useState(exeq)
  const [check,setcheck] = useState(false);
  const API_URL ='http://localhost:3001/items'
  useEffect(()=>{
    const fetchitem = async ()=> {
      try{
        const response = await fetch(API_URL)
        const listeq = await response.json()
        setitem(listeq)
        // setitem([])
       
        
      }
      catch (e){
        console.log(e.stack)
      }
    }

    fetchitem()

  },[])

useEffect(()=>{
  itemref.current = item
  exeqref.current =exeq
},[item,exeq])
  const inputinter = (e)=>{
    artemp[e.target.id] = JSON.parse(e.target.value)
    let ar =[]
    for(let i =0;i<artemp.length/2;i++){
      ar.push(artemp[i])
    }
    setinterx(ar)
    ar= []
    for(let i =artemp.length/2;i<artemp.length;i++){
      ar.push(artemp[i])

    }
    setintery(ar)
    
  }

  const inputmat = (e)=>{
    // console.log(e.target.value)
    mat[e.target.id[1]][e.target.id[4]] = Number(e.target.value)
    console.log(mat)
    setmat(mat)
    setEquation(JSON.stringify(mat))
      
  }
  const inputmat2 = (e)=>{
    
    mat2[e.target.id] = Number(e.target.value)
    // console.log(mat2)
    setmat2(mat2)
    setEquationans(JSON.stringify(mat2))
    
  }
  const inputrow = (e) => {
    setrow(e.target.value);
  };
  const inputcolumn = (e) => {
    setcolumn(e.target.value);
  };

  const inputeq = (e) => {
    setEquation(e.target.value);
  };
  const inputtemp = (e) => {
    console.log(e.target.value)
    settemp(e.target.value);
  };
  const inputleft = (e) => {
    setleft(e.target.value);
  };
  const inputright = (e) => {
    setright(e.target.value);
  };
  const [equationans, setEquationans] = useState("");

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
  } else if(
    st==="cramer"||
    st==="gauseeliminate"||
    st==="gausejordan"||
    st==="lu"||
    st==="jacobi"||
    st==="seidal"||
    st==="conjugate"
  ){
    ep = 2;
  }
  else{
    ep =3;
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
        // console.log("st  :      ", st);
        
        leftinput = "ใส่ค่าเริ่มต้น";
      } else if (st === "newtonraphson") {
        console.log("st  :      ", st);
        leftinput = "ใส่ค่าเริ่มต้น";
      }
    }
  } else if (ep === 2) {
    // console.log(mat);
    if (document.getElementById("ans")) {
      // console.log("test")
      let holder = document.getElementById("ans");
      holder.innerHTML = "";
      for (let i = 0; i < answer.length; i++) {
        let a = i+1
        holder.innerHTML += "x"+a+" = "+JSON.parse(answer[i]).toFixed(6) + " ";
      }
    }
    if (document.getElementById("err")) {
      try{
        let holder = document.getElementById("err");
      holder.innerHTML = "";
      if(st!=="conjugate"){
        
        for (let i = 0; i < arerr.length; i++) {
          let a = i+1
          console.log(error)
          holder.innerHTML += "Error"+a+" = "+JSON.parse(error[i]).toFixed(10) + " ";
        }
      }
      else{
          console.log(error)
          holder.innerHTML += "Error = "+JSON.parse(error[error.length-1]);
      }
      }catch(e){
        console.log(e)
      }
    }
  }
 useEffect(()=>{
  
    try{
      
      if(ep===2){
        let count = 0
      let holder = document.getElementById("drawmatrix");
      let matrixinput =[]
      for(let i = 0;i<column;i++){
        for(let j=0;j<row;j++){
          let id = "["+i+"]["+j+"]"
          matrixinput.push(<input id={id} type="number" className="inputmatrix" onChange={inputmat}/>)
          count++;
        }
        matrixinput.push(<br/>)
      }
      console.log(mat)

      setmat([])

      for(let i = 0;i<column;i++){
            let artemp = []
            for(let j=0;j<row;j++){
              artemp.push(0)
            }
            mat[i]=artemp;
          }
      // if(mat.length===0&&row>0&&column>0){
      //   for(let i = 0;i<column;i++){
      //     let artemp = []
      //     for(let j=0;j<row;j++){
      //       artemp.push(0)
      //     }
      //     mat[i]=artemp;
      //   }
      // }
      // else if(mat[0].length!==row||mat.length!==column){

      //   setmat([])
        
      //   let ar =[]
      //   for(let i = 0;i<column;i++){
      //     let artemp = []
      //     for(let j=0;j<row;j++){
      //       artemp.push(0)
      //     }
      //     ar[i] =artemp
      //   }
      //   setmat(ar)
      // }
      
      let holder2 = document.getElementById("drawmatrix2")
      let answerinput = []
      count=0
      for(let i =0;i<column;i++){
        answerinput.push(<input id={count} type="number" className="inputmatrix2" onChange={inputmat2}/> )
        count++
        answerinput.push(<br/>)
      }

      setmat2([])
      for(let i = 0;i<column;i++){
            console.log(i)
            mat2[i] = 0;
          }
      // if(mat2.length===0&&column>0){
      //   console.log("case 1")
      //   for(let i = 0;i<column;i++){
      //     mat2[i] = 0;
      //   }
      // }
      // else if(mat[0].length!==row||mat.length!==column){
      //   console.log("case 2")

      //   setmat2([])

      //   let ar =[]
      //   for(let i = 0;i<column;i++){
      //     ar.push(0)
      //   }
      //   setmat2(ar)
      // }
      ReactDOM.render(matrixinput,holder)
      ReactDOM.render(answerinput,holder2)

      
      }
    }catch(e){
      console.log(e)
    }
    
 },[row,column])
 useEffect(()=>{
  if(ep===3){
    try{
      let holder = document.getElementById("inputinterpolation")
      let input =[]
      let temp2 = Array(JSON.parse(row)*2).fill(0)
  
          for(let j=0;j<row;j++){
            let t = j+JSON.parse(row)

            input.push(<div>
              <span style={{display:"flex"}}><p>x :{j+1}</p><input id={j} type="number"  onChange={inputinter} style={{width:"80px"}} />
                    <p>y :{j+1}</p><input id={t} type="number"  onChange={inputinter} style={{width:"80px"}} />
              </span>
              <br/>
            </div>
            )
          }
         
        ReactDOM.render(input,holder)
        setartemp(temp2)
    }catch(e){
      console.log(e)
    }
  }
},[row])
  const onSubmitf = (event) => {
    event.preventDefault();
    setanswer([])
    let nar =[]
    if (st === "bisection") {
      let l = Number(left);
      let r = Number(right);
      console.log("bisection");
      if (equation.length > 0 && left.length > 0 && right.length > 0) {
          nar.push(Bisection(equation,l,r))
          setanswer(nar[0][0]);
          seterror(nar[0][1]);
      }
    } else if (st === "falseposition") {
      let l = Number(left);
      let r = Number(right);
      if (equation.length > 0 && left.length > 0 && right.length > 0) {
          nar.push(FalsePosition(equation,l,r))
          setanswer(nar[0][0]);
          seterror(nar[0][1]);
      }
    } else if (st === "onepoint") {
        if (equation.length > 0) {
          nar.push(OnePoint(equation,left))
          setanswer(nar[0][0]);
          seterror(nar[0][1]);
        }
 
    } else if (st === "newtonraphson") {
        if (equation.length > 0) {
          nar.push(Newtonraphson(equation,left))
          setanswer(nar[0][0]);
          seterror(nar[0][1]);
        }
    } else if (ep === 2) {
      document.getElementById("ans").innerHTML =""
      if (st === "cramer") {
          let eq = JSON.parse(equation);
          const eqans = JSON.parse(equationans);
          nar.push(CramerRule(eq,eqans))
          setanswer(nar[0])
     
      }
      else if(st==="gauseeliminate"){
        console.log(st)
        nar.push(Gausseliminate(equation,equationans))
        console.log(nar)
        setanswer(nar[0])
      }
      else if(st==="gaussjordan"){
        console.log(st)
        nar.push(GauseJordan(equation,equationans))
        setanswer(nar[0])
        console.log(nar[0])
          
      }
      else if(st==="jacobi"){

        nar.push(Jacobi(equation,equationans,left))
        let temp = transpose(nar[0][1])
        let temp2 = Object.keys(temp).map((e) =>temp[e][temp[0].length-1]);
        seterror(temp2)
        setarans(transpose(nar[0][0]))
        seterr(transpose(nar[0][1]))
        setanswer(nar[0][2])
      }
      else if(st==="seidal"){
        nar.push(Gaussseidal(equation,equationans,left))
        let temp = transpose(nar[0][1]) 
        let temp2 = Object.keys(temp).map((e) =>temp[e][temp[0].length-1]);
        seterror(temp2)
        seterr(transpose(nar[0][1]))
        setarans(transpose(nar[0][0]))
        setanswer(nar[0][2])
      }
      else if(st==="conjugate"){
        nar.push(Conjugate(equation,equationans,left))
        let x = JSON.parse(JSON.stringify(nar[0][0]))
        let y = JSON.parse(JSON.stringify(nar[0][1]))
        let z = JSON.parse(JSON.stringify(nar[0][2]))
        let ans  =[]
        let dataans = []
        let ch = ""
        let  i =1
        for( i  = 1;i<x.length;i++){
          if(x[i]==']'){
            ans.push(parseFloat(ch))
            break;
          }
          if(x[i]==','){
            ans.push(parseFloat(ch))
            ch = ""
            i++;
          }
          ch = ch+x[i]
        }
        ch = ""
        for(let j = 0;j<y.length;j++){
          let temp = []
          for( i  = 1;i<y[j].length;i++){
            if(y[j][i]===']'){
              temp.push(parseFloat(ch))
              ch = ""
              break;
            }
            if(y[j][i]===','){
              temp.push(parseFloat(ch))
              ch = ""
              i++;
            }
            ch = ch+y[j][i]
          }
          dataans.push(temp)
        }
        setarans(transpose(dataans))
        seterr(z[z.length-1])
        seterror(z)
        setanswer(ans)
      }
    }
    else if(ep ===3){
      // console.log(equation)
      let ar = []
      let x = left
      for(let i =0;i<equation.length;i++){
        let text = ""
        if(equation[i]!==','){
          for(let j =i;j<equation.length;j++){
            if(equation[j]===','){
              i=j;
              break;
            }
            text+=equation[j]
          }
          
          ar.push(JSON.parse(text)-1)
        }

      }

      if(st==="lagrange"){

        nar.push(Lagrange(interx,intery,x,ar))
        setanswer(nar[0])
        // console.log(nar[0])
      }
    }
  };
  let data = [];
  let datae = [];
  
  useEffect(() => {
    setanswer([]);
    seterror([]);
    seterr([]);
  }, [equation, left, right,equationans]);
  let tempar =[]
  let temper = []
  for(let i = 0;i<arans.length;i++){
    tempar.push(arans[i].map((e) =>JSON.parse(JSON.stringify(e.toFixed(6)))))
  }
  for(let i = 0;i<arerr.length;i++){
    
    temper.push(arerr[i].map((e) =>JSON.parse(JSON.stringify(e))))
  }
  for (let i = 0; i < answer.length; i++) {
    data.push( JSON.parse(JSON.stringify(answer[i].toFixed(6))));
  }
  // console.log(data)
  for (let i = 0; i < error.length; i++) {
    datae.push(error[i]);
  }
  if(ep===2){
    data = tempar
    if(st==="jacobi"||st==="seidal"){
      datae =temper
    }
  }
  useEffect(() => {
    let holder = document.getElementById("drop");
    let input = [];
    let ar =[]
    console.log(item[0])
    try{
      
    if (st === "onepoint") {
      for (let i = 0; i < item[0].onepoint.length; i++) {
        ar.push(item[0].onepoint[i].eq);
      }
    } else if (ep === 1) {
      for (let i = 0; i < item[0].ch1.length; i++) {
        ar.push(item[0].ch1[i].eq);
      }
    }
    else if(ep===2){
      for(let i = 0;i<item[0].ch2.length;i++){
        // console.log(item[0].ch2[i].eq)
        ar.push(JSON.stringify(item[0].ch2[i].eq))
        ar[i]+="*"
        ar[i]+=JSON.stringify(item[0].ch2[i].eqans)
      }
    }
    ar.push("custom");
    console.log(ar)



    }
    catch (e){
      // console.log(e.stack)
    }

    input.push(
      <Dropd
        placeholder="select ex equation"
        list={ar}
        onItemChange={(data) => {
          
          if (data !== "custom") {
            setcheck(false)
            if(ep===1){
              setEquation(data);
            }
            if(ep===2){
              let a  =[]
              let b = []
              let count=0
              for(let i = 0;i<data.length;i++){
                if(data[i]==="*"){
                  break;
                }
                count++;
              }
              a = data.slice(0,count)

              b = data.slice(count+1,data.length)
              console.log(a)
              console.log(b)
              setEquation(a)
              setEquationans(b)

            }
          }
          else if(data!==equation){
            
            setEquation("")
            setEquationans("")
          }
          if(data===""||data==="custom"){
            setcheck(true)
          }
        }}
      />
    )
    ReactDOM.render(input,holder)
  }, [ep, st,item]);




  // console.log(exeq)
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
    <div align="center" className="form">
      <h1>{st}</h1>
      <div id="drop"></div>
      <br />
      <br />
      {ep === 1 && (
        <div>
          <div>
            <MathJaxContext>Question : {mt(equation)}</MathJaxContext>
            <br />
            Answer: {answer[answer.length - 1]}
          </div>

          <p> error: {error[error.length - 1]}</p>
          <form onSubmit={onSubmitf} id="roote">
            {!{ check  } && (
              <div>
                <label>Put the equation : </label>
                <input type="text" onChange={inputeq} />
              </div>
            )}
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
          {typeof data[0] !== undefined && (
            <div className="chart">
              {/* {console.log(typeof(data[0]))} */}
              <Chartcomponent dataans={data} dataerror={datae}></Chartcomponent>
              {/* <Chartcomponent2 fx = {fx}></Chartcomponent2> */}
            </div>
          )}
        </div>
      )}
      {ep === 2 && (
        <div>
          <MathJaxContext>
            <p>
              Matrix : {mt(equation)} ,{mt(equationans)}
            </p>
          </MathJaxContext>
          <p>Answer:</p>
          <p id="ans"></p>
          {(st === "jacobi" || st === "seidal" || st === "conjugate") && (
            <p id="err"></p>
          )}
          {check && (
            <div>
              <span>
                row:
                <input
                  type="number"
                  onChange={inputrow}
                  className="inputmatrix"
                ></input>
              </span>
              <span>
                column:
                <input
                  type="number"
                  onChange={inputcolumn}
                  className="inputmatrix"
                ></input>
              </span>
              <div className="matrix">
                <div>
                  <p>matrixA</p>
                  <div id="drawmatrix" className="matrix1" />
                </div>
                <div>
                  <p>matrixB</p>
                  <div id="drawmatrix2" className="matrix2" />
                </div>
              </div>
            </div>
          )}

          <form onSubmit={onSubmitf} id="linear">
            {(st === "jacobi" || st === "seidal" || st === "conjugate") && (
              <div>
                <label>ใส่ค่าเริ่มต้นขั้นด้วย ,(ตามจำนวน column)</label>
                <input type="text" onChange={inputleft} />
              </div>
            )}
            <br />
            <button type="submit">submit</button>
          </form>
        </div>
      )}
      {(st === "jacobi" || st === "seidal" || st === "conjugate") && (
        <div className="chart">
          <Chartcomponent dataans={data} dataerror={datae}></Chartcomponent>
        </div>
      )}
      {ep === 3 && (
        <div>
          <span>
            จำนวน x :
            <input
              type="number"
              onChange={inputrow}
              className="inputmatrix"
            ></input>
          </span>
          <div id="inputinterpolation" />
          <form onSubmit={onSubmitf}>
            <span>
              <p>เลือกจุดที่ต้องการใช้</p>
              <input type="text" onChange={inputeq}></input>
            </span>
            <span>
              <p>ใส่ค่า X </p>
              <input type="text" onChange={inputleft}></input>
            </span>
            <br />
            <button type="submit">confirm</button>
          </form>
        </div>
      )}
    </div>
  );
};
export default Formcomponent;

