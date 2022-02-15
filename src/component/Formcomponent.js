import { useState,useEffect } from "react";
import { evaluate,parse,sqrt,abs } from "mathjs";
import * as V from 'victory';
import { VictoryChart } from "victory";
const Formcomponent = ()=>{
    const [equation,setEquation] = useState("")
    const [left,setleft] = useState("")
    const [right,setright] = useState("")
    const [answer,setanswer] = useState([
        {x:0,y:0}
    ])
    
    const inputeq = (e) =>{setEquation(e.target.value)}
    const inputleft = (e) =>{setleft(e.target.value)}
    const inputright = (e) =>{setright(e.target.value)}
    let arr = [];// 1,2,3
    

    // console.log(data)
    function geterror(x,y){

        return abs((x-y)/x)
    
    }
    useEffect(()=>{
        if (equation.length > 0 && left.length > 0 && right.length > 0) 
        {
        
          try {
            let eq = "";
            if (equation[0] === "-") {
              eq = "x" + equation;
            } else {
              eq = "x+" + equation;
            }
            let eqt = parse(eq);
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
            
            while(e>eps){
                // console.log(l," ",r)
                let mid = (l+r)/2
                let fm = eqt.evaluate({ x: mid })
                let fl = eqt.evaluate({ x: l })
                let fr = eqt.evaluate({ x: r })

                
                const data = [
                    {"mid":mid},
                    {"f(m)":fm},
                    {'r':r},
                    {"f(r)":fr},
                    {"l":l},
                    {"f(l)":fl},
                    {"e":e},
                    {"fr*fm":fm*fr}
                    
                ]
                // console.log(data)
                // console.log(mid)
                if(fr*fm>0){
                    old = right
                    r = mid
                    e = geterror(mid,old)
                    // e= e.im
                    
                    if(e<eps){
                        console.log("case 1")
                        break;
                    }
                }
                else{
                    old = left
                    l = mid
                    e = geterror(mid,old)
                    // e=e.im
                    if(e<eps){
                        console.log("case 2")
                        break;
                    }
                }
                ans = mid
                arr.push({x:arr.length+1,y:ans})
                
                const t = {x:arr.length+1,y:ans}
                setanswer(answer=>[...answer,t])
                // console.log(arr)
                if(i>0) {
                    if(abs(ans-temp)<0.00002){
                        state+=1;
                    }
                    temp = ans
                }
                i++;
                if(state>=10){
                    console.log("case 3" )
                    break;
                }
                // console.log("e : ",e,"eps : ",eps)
            }
            

            
            console.log("answer : ", ans);
            // setanswer(ans)
            console.log("ans = ",answer)
          } catch (e) {
            console.log(e);
          }
        }
    },[equation,left,right])
  
    
    // const data = arr.map((e,index)=>{
        const data = []
    // })
    console.log(arr)
    for(let i = 0;i<10;i++){
        data.push(arr[i])
        console.log(arr[0])
    }
    return (
      <div align="center">
          <div>
              {/* <VictoryChart>
                  <V.VictoryBar data={data} x ="quarter" y = "earning"/>
              </VictoryChart> */}
              {/* <VictoryChart width={700}>
                  <V.VictoryLine data={arr[0]
                      
                //       [
                //       {x: 1, y: 1.75},
                //       {x: 2, y: 1.625},
                //       {x: 3, y: 1.5625},
                //       {x: 4, y: 1.53125},
                //       {x: 5, y: 1.515625},
                //       {x: 6, y: 1.5078125},
                //       {x: 7, y: 1.50390625},
                //       {x: 8, y: 1.501953125},
                //       {x: 9, y: 1.5009765625}
                //   ]
                  
                  }/>
              </VictoryChart> */}
          </div>
        <p> Answer: {answer}</p>
        <form>
            <div>
                <label>ใส่สมการ</label>
                <input type ="text"  onChange={inputeq}/>
            </div>
            <div>
                <label>ใส่ค่าด้านซ้าย</label>
                <input type ="text"  onChange={inputleft}/>
            </div>
            <div>
                <label>ใส่ค่าด้านขวา</label>
                <input type ="text"  onChange={inputright}/>
            </div>
            <button>submit</button>
        </form>
      </div>
    );
}
export default Formcomponent