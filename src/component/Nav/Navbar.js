import React,{useState} from "react";
import {Link, Route,Routes,NavLink,BrowserRouter as Router} from 'react-router-dom'
import "./Navbar.css"
import { Navitem } from "./Navitem";
import Dropdown from './Dropdown'
const Navbar = ()=>{
    const [dropdown1,setdropdown1] = useState(false);
    const [dropdown2,setdropdown2] = useState(false);
    const [dropdown3,setdropdown3] = useState(false);
    return (
      <div>
        {/* <NavLink to="/" activeclassname="selected">
          home
        </NavLink> */}
        <nav className="navbar">
          <ul className="nav-items">
            {Navitem.map((item) => {
              if (item.title === "Root of Equation") {
                return (
                  <li
                    key={item.id}
                    className={item.cName}
                    onMouseEnter={() => {
                      setdropdown1(true);
                    }}
                    onMouseLeave={() => {
                      setdropdown1(false);
                    }}
                  >
                    {dropdown1 && <Dropdown className="test" ep="0" />}
                    <Link to={item.path}>{item.title}</Link>
                  </li>
                );
              } else if (item.title === "Linear algebra") {
                return (
                  <li
                    key={item.id}
                    className={item.cName}
                    onMouseEnter={() => {
                      setdropdown2(true);
                    }}
                    onMouseLeave={() => {
                      setdropdown2(false);
                    }}
                  >
                    {dropdown2 && <Dropdown className="test" ep="1" />}
                    <Link to={item.path}>{item.title}</Link>
                  </li>
                );
              } else if (item.title === "Interpolation and Extrapolation") {
                return (
                  <li
                    key={item.id}
                    className={item.cName}
                    onMouseEnter={() => {
                      setdropdown3(true);
                    }}
                    onMouseLeave={() => {
                      setdropdown3(false);
                    }}
                  >
                    {dropdown3 && <Dropdown className="test" ep="2" />}
                    <Link to={item.path}>{item.title}</Link>
                  </li>
                );
              }
              return (
                <li key={item.id} className={item.cName}>
                  <Link to={item.path}>{item.title}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    );
}
export default Navbar;