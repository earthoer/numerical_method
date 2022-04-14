import { json } from "mathjs";
import React,{useState,useEffect,useRef} from "react";
import {Link, Route,Routes,BrowserRouter as Router} from 'react-router-dom'
import "./Dropdown.css"
import {Dropdownitem,Dropdownitems} from './Navitem'
const Dropdown =(ep)=>{
    const [dropdown,setdropdown] = useState(false);
    
    const [ar,setar] = useState(Dropdownitems[ep.ep].data)
   

    return(
        
            <ul className={dropdown? "submenus click":"submenus"} onClick={()=>setdropdown(!dropdown)}>
                {ar.map(item=>{
                    return(
                        <li key = {item.id}>
                            <Link to={item.path} className ={item.cName} onClick={()=>false}>{item.title}</Link>
                        </li>)
                })}
            </ul>
        )
}
export default Dropdown;