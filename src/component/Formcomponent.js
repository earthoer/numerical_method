import { useState } from "react";
const Formcomponent = ()=>{
    const [equation,setEquation] = useState("")
    const [left,setleft] = useState("")
    const [right,setright] = useState("")
    const inputeq = (e) =>{setEquation(e.target.value)}
    const inputleft = (e) =>{setleft(e.target.value)}
    const inputright = (e) =>{setright(e.target.value)}
    const data = [
        {"equation":equation},
        {"left":left},
        {"right":right}
    ]
    console.log(data)
    return (
      <div>
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
        </form>
      </div>
    );
}
export default Formcomponent