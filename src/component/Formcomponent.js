import { useState,useEffect } from "react";
import { evaluate,parse,sqrt,abs } from "mathjs";
// import 'Formcomponent.css'
import './Formcomponent.css'
import Chart from "./Chartcomponent";

const Formcomponent = (states)=>{
    const [equation,setEquation] = useState("")
    const [left,setleft] = useState("")
    const [right,setright] = useState("")
    const [answer,setanswer] = useState([])
    const [error,seterror] = useState([])
    const [fx,setfx] = useState([])
    const inputeq = (e) =>{setEquation(e.target.value)}
    const inputleft = (e) =>{setleft(e.target.value)}
    const inputright = (e) =>{setright(e.target.value)}
    
  
    let ar1  =[];
    let ar2  =[];
    let ar3  =[];
    // console.log(data)
    if (String.prototype.splice === undefined) {
      /**
       * Splices text within a string.
       * @param {int} offset The position to insert the text at (before)
       * @param {string} text The text to insert
       * @param {int} [removeCount=0] An optional number of characters to overwrite
       * @returns {string} A modified string containing the spliced text.
       */
      String.prototype.splice = function(offset, text, removeCount=0) {
        let calculatedOffset = offset < 0 ? this.length + offset : offset;
        return this.substring(0, calculatedOffset) +
          text + this.substring(calculatedOffset + removeCount);
      };
    }
    function geterror(x,y){

        return abs((x-y)/x)
    
    }
    function getfalsepos(xl,xr,fxl,fxr){
      return ((xl*fxr)-(xr*fxl))/(fxr-fxl)
    }
    let st = JSON.stringify(Object.values(states))
    st = st.slice(2,-2)
    // console.log(st)
    // console.log(['falsepositon'])
    // console.log(st==='falsepositon')
    const onSubmitf=(event)=>{
        event.preventDefault();
        let l = Number(left);
        let r = Number(right);
        let e = 100000;
        let eps =0.000001;
        let old = 0;
        let ans =0;
        let i =0;
        let temp = 0;
        let state = 0;
        if(st==='bisection'){
            console.log('bisection')
            if (equation.length > 0 && left.length > 0 && right.length > 0) 
            {
            
              try {
                let eq = "";
                let eqt
    
                if (equation.indexOf('x')<0) {
                  if (equation[0] === "-") {
                    let teq = equation.substring(1);
                    // teq = [teq.slice(0,1),'(',teq.slice(1).join('')]
                    teq = teq.splice(0,'(').splice(teq.length+1,')')
                    eq = "x+" + teq;
                  } else {
                    let teq = equation
                    teq = teq.splice(0,'(').splice(teq.length+1,')')
                    console.log(teq)

                    

                    eq = "x-" + teq;
                  }
                   eqt = parse(eq);
                }
                else{
                    eqt = parse(equation)
                }
                console.log(eqt.toString())
                
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
                  console.log(data)
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
                  const d = [{ e: er }, { ans: ans }];             
                  ar1.push(ans)
                  ar2.push(er)
                  ar3.push(fm)
                  if (i > 0) {
                    if (abs(ans - temp) < 0.00002) {
                      state += 1;
                    }
                    temp = ans;
                  }
                  i++;
                  if (state >= 5) {
                    console.log("case 3");
                    break;
                  }
                }
                setanswer(ar1)
                seterror(ar2)
                setfx(ar3)
              } catch (e) {
                console.log(e);
              }
            }
        }
        else if(st==='falsepositon'){
          console.log('falseposition')
          if (equation.length > 0 && left.length > 0 && right.length > 0) 
          {
          
            try {
              let eq = "";
              let eqt
  
              if (equation.indexOf('x')<0) {
                if (equation[0] === "-") {
                  let teq = equation.substring(1);
                  // teq = [teq.slice(0,1),'(',teq.slice(1).join('')]
                  teq = teq.splice(0,'(').splice(teq.length+1,')')
                  eq = "x+" + teq;
                } else {
                  let teq = equation
                  teq = teq.splice(0,'(').splice(teq.length+1,')')
                  // console.log(teq)

                  

                  eq = "x-" + teq;
                }
                 eqt = parse(eq);
              }
              else{
                  eqt = parse(equation)
              }

              console.log(eqt.toString())
              while (e > eps) {
                let mid = (l + r) / 2;
                let fm = eqt.evaluate({ x: mid });
                let fl = eqt.evaluate({ x: l });
                let fr = eqt.evaluate({ x: r });
                let x = getfalsepos(l,r,fl,fr)
                let fx = eqt.evaluate({x:x})
                const data = [
                  { "f(m)": fm },
                  { r: r },
                  { "f(r)": fr },
                  { l: l },
                  { "f(l)": fl },
                  { "x": x },
                  { "fx": fx },
                  { e: e },
                  { "fr*fm": fm * fr },
                ];
                console.log(data)
                if (fx * fr > 0) {
                  old = l;
                  r = x;
                  e = geterror(x, old);
                  // e= e.im
  
                  if (e < eps) {
                    console.log("case 1");
                    const er = e;
                    ans = x;
                    ar1.push(ans)
                    ar2.push(er)
                    ar3.push(fx)
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
                    ar1.push(ans)
                    ar2.push(er)
                    ar3.push(fx)
                    break;
                    
                  }
                }
                const er = e;
                ans = x;
                const d = [{ e: er }, { ans: ans }];      
                console.log(d)       
                ar1.push(ans)
                ar2.push(er)
                ar3.push(fx)
                if (i > 0) {
                  if (abs(ans - temp) < 0.00002) {
                    state += 1;
                  }
                  temp = ans;
                }
                i++;
                if (state >= 5) {
                  console.log("case 3");
                  break;
                }
              }
              setanswer(ar1)
              seterror(ar2)
              setfx(ar3)
            }
            catch(e){
              console.log(e)
            }
          
        }
        }
        else if(st==='onepoint'){
          console.log(st)
        }
        else if(st==='newtonraphson'){
          console.log(st)
        }
    }
    const data = []
    let datae =[]
    const datafx = [];
    useEffect(()=>{
        setanswer([])
        seterror([])
        setfx([])
    },[equation,left,right])
    console.log("ans = ",answer)
    console.log("error = ",error)
    console.log("fx = ",fx)
    for(let i = 0;i<answer.length;i++){
        data.push({y:answer[i],x:i+1})
    }
    for(let i = 0;i<data.length;i++){
        data[i].y = data[i].y.toFixed(6)
    }
    for(let i = 0;i<error.length;i++){
        datae.push({y:error[i],x:i+1})
    }
    for(let i = 0;i<fx.length;i++){
        datafx.push({y:fx[i],x:i+1})
    }

    return (
      <div align="center" className="form">
        <div className="chart">
          <Chart dataans={data} dataerror ={datae} datafx={datafx}></Chart>

        </div>
        <p> Answer: {answer[answer.length - 1]}</p>
        <p> error: {error[error.length - 1]}</p>
        <form onSubmit={onSubmitf}>
          <div>
            <label>ใส่สมการ</label>
            <input type="text" onChange={inputeq} />
          </div>
          <div>
            <label>ใส่ค่าด้านซ้าย</label>
            <input type="text" onChange={inputleft} />
          </div>
          <div>
            <label>ใส่ค่าด้านขวา</label>
            <input type="text" onChange={inputright} />
          </div>
          <button type="submit">submit</button>
        </form>
      </div>
    );
}
export default Formcomponent