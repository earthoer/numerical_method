import { useState,useEffect } from "react";
import { evaluate,parse,sqrt,abs } from "mathjs";
// import 'Formcomponent.css'
import './Formcomponent.css'
import Chart from "./Chartcomponent";

const Formcomponent = ()=>{
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
    function geterror(x,y){

        return abs((x-y)/x)
    
    }
    const onSubmitf=(e)=>{
        e.preventDefault();
        if (equation.length > 0 && left.length > 0 && right.length > 0) 
        {
        
          try {
            let eq = "";
            let eqt
            // console.log(equation.indexOf('x'))
            if (equation.indexOf('x')<0) {
              if (equation[0] === "-") {
                const teq = equation.substring(1);
                eq = "x+" + teq;
              } else {
                eq = "x-" + equation;
              }
               eqt = parse(eq);
            }
            else{
                eqt = parse(equation)
            }
            console.log(eqt.toString())
            let e = 100000;
            let eps =0.000001
            let old = 0;
            let ans =0;
            let i =0;
            let temp = 0;
            let state = 0;
            let l = Number(left);
            let r = Number(right);
            
            while (e > eps) {
              // console.log(l," ",r)
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
              // console.log(mid)
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
            //   setanswer((a) => [...a, ans]);
            //   console.log(ar1);
              ar2.push(er)
              ar3.push(fm)
            //   console.log(ar3)
            //   seterror((a) => [...a, er]);
            //   setfx((a) => [...a, fm]);

              if (i > 0) {
                if (abs(ans - temp) < 0.00002) {
                  state += 1;
                }
                temp = ans;
              }
              i++;
              if (state >= 10) {
                console.log("case 3");
                break;
              }
              // console.log("e : ",e,"eps : ",eps)
            }
            

            
            // console.log("answer : ", ans);
            // console.log("ans = ",answer)
            setanswer(ar1)
            seterror(ar2)
            // console.log("ar3 : ",ar3)
            setfx(ar3)
          } catch (e) {
            console.log(e);
          }
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
    // console.log("ans = ",answer)
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
    // for(let i = 0;i<datae.length;i++){
    //     datae[i].y = datae[i].y.toFixed(6)
    // }
    // console.log(data)
    
    // console.log(data)
    return (
      <div align="center" className="form">
        <div className="chart">
          <Chart dataans={data} dataerror ={datae} datafx={datafx}></Chart>

        </div>
        <p> Answer: {answer[answer.length - 1]}</p>
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