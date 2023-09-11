import React from "react";
import logo from "../../asset/hilti.png";
import "../style/NotFound.css"
import {useNavigate} from "react-router-dom"
import {logOut} from "../../App.js"


export const NotFound = () => {
    const navigate = useNavigate();
    return(
        <div className='notFoundMain'
        style={{
          display: "flex"
        }}>
        <img src={logo} alt="logo" className="logo"/>
          <div className='sub-main'>
            <div className="title-box">
                <div className="notFoundTitle">
                    <h1>Page Not Found!</h1>
                </div>
                <div className='wrapper'>
                    <button type="Back" className='btn' onClick={() => {logOut(); navigate("/login");}}>Back</button>
                </div>    
            </div>
      </div>
    </div>
    )
}