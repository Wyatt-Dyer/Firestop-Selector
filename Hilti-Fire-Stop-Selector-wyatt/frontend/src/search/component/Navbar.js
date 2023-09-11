import React, { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import './style/custom.css';
import { NavLink, useNavigate } from "react-router-dom";
import { logOut } from "../../App";

const Navbar = () =>{
  const [subCount, setSubCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const subItems = JSON.parse(window.localStorage.getItem("products_data")) || [];
    setSubCount(subItems.length);
  }, [subCount]);

  return(
<>
<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
  <div className="container-fluid">
  <a className="navbar-brand" href="/">
      {/* <img src={logo} alt="logo" className="logo" width="80" height="40"/> */}
 </a>
    <div className="collapse navbar-collapse" id="navbarColor01">
      <ul className="navbar-nav me-auto">
        <li className="nav-item">
          <a className="nav-link active">FireStop Selector
            <span className="visually-hidden">(current)</span>
          </a>  
        </li>
        <Nav.Link to="/directsearch" as={NavLink} onClick={logOut()}>
      Direct Search
          </Nav.Link>
          <Nav.Link to="/" as={NavLink}>
      Logout
          </Nav.Link>
      </ul>
    </div>
    <Nav.Link to="/submittal" as={NavLink} style={{width: 30, height: 30}} variant = "outline-primary" className="rounded-circle">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fit="" height="100%" width="100%" preserveAspectRatio="xMidYMid meet" focusable="false" style={{float: "right"}}>
        <path fill="#524F53" fill-rule="evenodd" d="M5.347 2.667h13.32l8 8v18.666H5.333l.014-26.666zM17.333 12h7.334l-7.334-7.333V12z"></path>
      </svg>
      {/* <div className="rounded-circle bg-info d-flex justify-content-center align-items-center" style={{color: "white", width:"1.2rem", height:"1.2rem", position:"relative", float: "right"}}>
        {subCount} 
      </div>*/}
    </Nav.Link>
  </div>
</nav>
</>
  )
}

export default Navbar;