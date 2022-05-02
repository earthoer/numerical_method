import { useState,useEffect, createElement,useRef } from "react";
import { evaluate,parse,sqrt,abs,derivative,format,matrix,det,multiply,subset,index,row,column,transpose, ConditionalNodeDependencies} from "mathjs";
import './Formcomponent.css'
import Chart from "./Chartcomponent";
import Select from 'react-select'
import {MathJax,MathJaxContext} from "better-react-mathjax"
import Proof from "./ch1/Proof"
import Proof2 from "./ch2/Proof2"
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
  const [leftinput,setleftinput] = useState("");
  const [rightinput,setrightinput] = useState("");
  const [exeq,setexeq] = useState([]);
  const exeqref = useState(exeq)
  const [check,setcheck] = useState(false);
  const [state,setstate] = useState(false);
  const [state2,setstate2] = useState(true);
  const [epcheck,setepcheck] = useState(0);
  const [ep,setep] = useState(1)
  const [value,setvalue] = useState("select ex equation")
  const epref = useRef(ep)
  const API_URL ='http://localhost:3001/items'
  const API_LOGIN ='http://localhost:3001/login'
  const axios = require('axios')
  useEffect(()=>{
    const fetchitem = async ()=> {
      try{
        let key
        await axios.post(API_LOGIN,{
          email:"earthgodna@gmail.com",
          password:"0836054655"
        }).then(response =>{
          key = response.data.accessToken;
        }).catch(error=>{
          console.log(error.response.data.error)
        })


        // console.log(key)
        await axios.get(API_URL
          ,{
          headers: {
            'Authorization': `Bearer ${key}`
          }
        }
        )
        .then(response=>{
          setitem(response.data)
        }).catch(error=>{
          console.log(error)})

        // console.log(item)

        // const response = await fetch(API_URL)
        // const listeq = await response.json()
        // setitem(listeq)
       
        
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
  epref.current =ep
},[item,exeq,ep])
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
    let id = e.target.id
    let id1 =""
    let id2 =""
    let count =1;
    // console.log(id)
    for(let i = 1;i<id.length;i++){
      if(id[i]===']'){
        count+=2
        break;
      }
      // console.log(id[i])
      id1+=id[i]
      count++;
    }
    for(let i = count;i<id.length;i++){
      if(id[i]===']')break;
      // console.log(id[i])
      id2+=id[i]
    }
    // console.log("id1 : ",id1," count ",count)
    // console.log("id2 : ",id2)
    mat[JSON.parse(id1)][JSON.parse(id2)] = Number(e.target.value)
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
    setfx(e.target.value)
    setstate(false)
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
  let st = JSON.stringify(Object.values(states));
  st = st.slice(2, -2);
  useEffect(() => {
    if (
      st === "bisection" ||
      st === "falseposition" ||
      st === "onepoint" ||
      st === "newtonraphson"
    ) {
      setstate(false)
      setep(1);
      console.log("1  : ",st)
      if (document.getElementById("l")) {
        if (st === "bisection" || st ==="falseposition") {
          setleftinput("ใส่ค่าด้านซ้าย")
          setrightinput("ใส่ค่าด้านขวา")
        }  else if (st === "onepoint") {
          setleftinput("ใส่ค่าเริ่มต้น")
        } else if (st === "newtonraphson") {
          setleftinput("ใส่ค่าเริ่มต้น")
        }
      }
      setEquation("");
      setvalue("select ex equation");

    } else if (
      st === "cramer" ||
      st === "gauseeliminate" ||
      st === "gaussjordan" ||
      st === "lu" ||
      st === "jacobi" ||
      st === "seidal" ||
      st === "conjugate"
    ) {
      setep(2);
      console.log("2 : ",st)
      try {
        
        
      } catch (e) {}
      setvalue("select ex equation");
      setEquation("");
    } else {
      setep(3);
      setvalue("select ex equation");
      setEquation("");
    }

  }, [st]);



 useEffect(()=>{
  
    try{
      setEquation("")
      if(ep===2){
        let count = 0
      let holder = document.getElementById("drawmatrix");
      let matrixinput =[]
      for(let i = 0;i<column;i++){
        for(let j=0;j<row;j++){
          let id = "["+i+"]["+j+"]"
          matrixinput.push(<input id={id}  type="number" className="inputmatrix" onChange={inputmat}/>)
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
      console.log(mat)
      
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

  const checkleft=(data,col)=>{
    let count=0
    for(let i=0;i<data.length;i++){
      if(data[i]==','){
        console.log(data[i+1])
        if(!data[i+1]) return false;
        else if(data[i+1]==',')return false;
        else if(data.length<i+1)return false
        else count++;
      }
      
    }
    // console.log(count,col)
    if(count==col-1)return true
    return false;
  }
  const onSubmitf = (event) => {
    event.preventDefault();
    setanswer([])
    let nar =[]
    
    if(ep===1){
      if((st==="bisection"||st === "falseposition")&&(equation===""||left===""||right===""||JSON.parse(left)>JSON.parse(right))){
        if(equation===""){
          alert("Please select the quesion!")
        }
        else if(JSON.parse(left)>JSON.parse(right)){
          alert("Please enter right more than left")
        }
        else{
          alert("Please enter left and right")
        }
      }  
      else{
        setstate(true);
        if (st === "bisection") {

          let l = Number(left);
          let r = Number(right);
          if (equation.length > 0 && left.length > 0 && right.length > 0) {
              nar.push(Bisection(equation.replace("x","(x)"),l,r))
              // Chartcomponent2(nar[0][0][nar[0][0].length-1])
              console.log(nar[0][0])
              setanswer(nar[0][0]);
              seterror(nar[0][1]);
    
          }
        } else if (st === "falseposition") {
          let l = Number(left);
          let r = Number(right);
          if (equation.length > 0 && left.length > 0 && right.length > 0) {
              nar.push(FalsePosition(equation.replace("x","(x)"),l,r))
              setanswer(nar[0][0]);
              seterror(nar[0][1]);
          }
        } else if (st === "onepoint") {
            if (equation.length > 0) {
              nar.push(OnePoint(equation.replace("x","(x)"),left))
              setanswer(nar[0][0]);
              seterror(nar[0][1]);
            }
     
        } else if (st === "newtonraphson") {
            if (equation.length > 0) {
              nar.push(Newtonraphson(equation.replace("x","(x)"),left))
              setanswer(nar[0][0]);
              seterror(nar[0][1]);
            }
        }
      }
    }
    else if (ep === 2) {
      
      let ans2
      let err2
      document.getElementById("ans").innerHTML =""
      if(!equation)alert("Plese select equation correctly")
      else if (st === "cramer") {
        setstate(true);
          let eq = JSON.parse(equation);
          console.log(st)
          const eqans = JSON.parse(equationans);
          nar.push(CramerRule(eq,eqans))
          setanswer(nar[0])
          ans2= nar[0]
     
      }
      else if(st==="gauseeliminate"){
        setstate(true);
        console.log(st)
        nar.push(Gausseliminate(equation,equationans))
        console.log(nar)
        setanswer(nar[0])
        ans2 = nar[0]
      }
      else if(st==="gaussjordan"){
        setstate(true);
        console.log(st)
        nar.push(GauseJordan(equation,equationans))
        setanswer(nar[0])
        console.log(nar[0])
        ans2=nar[0]
          
      }
      else{
        console.warn(equation)
        
        if(JSON.parse(equation).length!==JSON.parse(equation)[0].length)alert("Please enter square matrix ")
        //symmetric matrix
        else if(JSON.stringify(transpose(JSON.parse(equation)))!==JSON.stringify(JSON.parse(equation)))alert("Please enter symmetry matrix")
        else if(checkleft(left,JSON.parse(equation)[0].length)){
          setstate(true)
          if(st==="jacobi"){
            // console.log(equation,equationans,left)
            nar.push(Jacobi(equation,equationans,left))
            
            let temp = transpose(nar[0][1])
            let temp2 = Object.keys(temp).map((e) =>temp[e][temp[0].length-1]);
            seterror(temp2)
            setarans(transpose(nar[0][0]))
            seterr(transpose(nar[0][1]))
            setanswer(nar[0][2])
            ans2=nar[0][2]
            err2=temp2
          }
          else if(st==="seidal"){
            nar.push(Gaussseidal(equation,equationans,left))
            let temp = transpose(nar[0][1]) 
            let temp2 = Object.keys(temp).map((e) =>temp[e][temp[0].length-1]);
            seterror(temp2)
            seterr(transpose(nar[0][1]))
            setarans(transpose(nar[0][0]))
            setanswer(nar[0][2])
            ans2=nar[0][2]
            err2=temp2
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
            console.log(ans)
            ans2= ans
            err2 = z[z.length-1]
          }
        }
        else{
          alert("Please enter starting value correctly")
        }
      }
      if (document.getElementById("ans")) {
        // console.log(document.getElementById("ans"));
        let holder = document.getElementById("ans");
        holder.innerHTML = "";
        console.log(ans2);
        for (let i = 0; i < ans2.length; i++) {
          let a = i + 1;
          holder.innerHTML +=
            "x" + a + " = " + JSON.parse(ans2[i]).toFixed(6) + " ";
        }
      }
      if (document.getElementById("err")) {
        try {
          let holder = document.getElementById("err");
          holder.innerHTML = "";
          if (st !== "conjugate") {
            for (let i = 0; i < err2.length; i++) {
              let a = i + 1;
              // console.log(error)
              holder.innerHTML +=
                "Error" + a + " = " + JSON.parse(err2[i]).toFixed(10) + " ";
            }
          } else {
            // console.log(error);
            holder.innerHTML +=
              "Error = " + JSON.parse(err2);
          }
        } catch (e) {
          console.log(e.stack);
        }
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
    setstate(false)
    // setEquationans([])
    // setEquationans([])
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
    setEquationans([])
    setstate(false)
    let holder = document.getElementById("drop");
    let input = [];
    let ar =[]
    // console.log(item[0])
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
    // console.log(ar)



    }
    catch (e){
    }

    input.push(
      <Dropd
        placeholder={value}
        list={ar}
        // ref={(s)=>{setvalue(s)}}
        className="dropd_drop"
        onItemChange={(data) => {
          setstate(false)
          if (data !== "custom") {
            setcheck(false)
            if(ep===1){
              // console.log(data.replace("x","(x)"))
              setEquation(data);
              setfx(data)
            }
            else if(ep===2){
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
              // console.log(a)
              // console.log(b)
              setEquation(a)
              setEquationans(b)

            }
            else if (st==="onepoint"){
              setEquation(data)
              setfx(data)
            }
          }
          else if(data!==equation){
            
            setEquation("")
            setEquationans("")
            setfx("")
          }
          if(data===""||data==="custom"){
            setcheck(true)
          }
        }
        
      }
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
      <div className="topform">
        <h1 className="Header">{st}</h1>
        <div id="drop"></div>
        <br />
        <br />
      </div>
      {ep === 1 && (
        <div>
         <div className="topform">
         <div>
            <MathJaxContext>Question : {mt(equation)}</MathJaxContext>
            <br />
            Answer: {answer[answer.length - 1]}
          </div>
          <p> error: {error[error.length - 1]}</p>
           <form onSubmit={onSubmitf} id="roote">
            <div className={check ? "inputtrue" : "inputfalse"}>
              <input
                type="text"
                className="input"
                onChange={inputeq}
                placeholder="Put the equation"
              />
            </div>

            <div align="center">
              <div id="l">
                {(st === "bisection" || st === "falseposition") && (
                  <div>
                    <input
                      className="input"
                      type="text"
                      onChange={inputleft}
                      placeholder="Left input"
                    />
                  </div>
                )}
                {(st === "onepoint" || st === "newtonraphson") && (
                  <div>
                    <input
                      className="input"
                      type="text"
                      onChange={inputleft}
                      placeholder="Startvalue"
                    />
                  </div>
                )}
              </div>
              {st !== "newtonraphson" && st !== "onepoint" && (
                <div id="r">
                  <input
                    className="input"
                    type="text"
                    onChange={inputright}
                    placeholder="Right input"
                  />
                </div>
              )}
            </div>

            <button className="button" type="submit">
              submit
            </button>
          </form>
         </div>
         
          {typeof data[0] !== undefined && state === true && (
            <div className="chart">
              {/* {console.log("fx : ",fx)} */}

              <Chartcomponent2
                fx={fx.replace("x", "(x)")}
                l={Number(left)}
                r={Number(right)}
              ></Chartcomponent2>
              <Chartcomponent dataans={data} dataerror={datae}></Chartcomponent>
              <Proof eq={equation} x={answer[answer.length - 1]} />
            </div>
          )}
        </div>
      )}
      {ep === 2 && (
        <div >
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

          <div className={check ? "inputtrue" : "inputfalse"}>
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

          <form onSubmit={onSubmitf} id="linear">
            {(st === "jacobi" || st === "seidal" || st === "conjugate") && (
              <div>
                <input
                  className="input"
                  type="text"
                  onChange={inputleft}
                  placeholder="ใส่ค่าเริ่มต้นขั้นด้วย ,(ตามจำนวน column)"
                />
              </div>
            )}
            <br />
            <button className="button" type="submit">
              submit
            </button>
          </form>
          {(st === "jacobi" || st === "seidal" || st === "conjugate") && (
            <div className="chart">
              <Chartcomponent dataans={data} dataerror={datae}></Chartcomponent>
            </div>
          )}
          {state === true && (
            <div className="chart">
              <Proof2
                equation={equation}
                equationans={equationans}
                ans={answer}
              />
            </div>
          )}
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
            <button className="button" type="submit">
              confirm
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
export default Formcomponent;

