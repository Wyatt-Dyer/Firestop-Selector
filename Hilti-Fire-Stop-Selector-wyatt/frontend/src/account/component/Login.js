import React, {  useState } from 'react';
import { getAccountID } from '../../App';
import '../style/Login.css';
import logo from "../../asset/hilti.png";
import image1 from "../../asset/image1.png";
import image2 from "../../asset/image2.png";
import { useNavigate } from 'react-router-dom';



export const Login = _ => {

  const [accountID, setAccountID] = useState("none");
  let rememberMe = false;

  getAccountID().then(res => setAccountID(res));

  const navigate = useNavigate();

  const handleChange = (e) => {
      rememberMe = e.target.checked;
  };
  
  const login = () =>{
    try{
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      console.log(username, password)
      if(!username || !password)
          return alert("Please fill in all fields!");
      fetch("/api/login", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              username: username,
              password: password,
              rememberMe: rememberMe
          })
      })
        .then((res) => {return res.json(); })
          .then((data) => {
            console.log(data)
              if(!data.status){
                  alert(data.message);
              }else{
                  alert("Login successfully!");
                  console.log(data);
                  localStorage.setItem("rememberMe", rememberMe);
                  if(rememberMe){
                      localStorage.setItem("u", data.loginToken);
                  }
                  else{
                      sessionStorage.setItem("u", data.loginToken);
                  }
                  if(data.accountType === "e"){
                      navigate("/directSearch");
                  }
                  else{
                      navigate("/admin");;
                  }
              }
          });
  }catch(error){
      alert(error);
  }
  }


    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
          login();
      }
    }

     return(
    <div className='main'
      style={{
        display: "flex"
      }}>
      <img src={logo} alt="logo" className="logo"/>
      <img src={image1} alt="image1" className='image1'/>
      <img src={image2} alt="image2" className='image2'/>
        <div className='sub-main'>
          <div className="login-wrapper">
            <h2 style={{color: "white", marginBottom: "5%"}}>Firestop Selector</h2>
              <label>
                <input type="text" placeholder="username" className="username" id='username' onKeyDown={handleKeyDown}/>
              </label>
            <div className="second-input"></div>
              <div>
                <label>
                <input placeholder="password" className="password" id='password' onKeyDown={handleKeyDown}/>
              </label>
            </div>
            <p className='link'>
              {/* <a href='#'>Forgot Password?</a> */}
            </p>
            <p className='login2'>
              Remember Login for 7 days &nbsp;
              <input type={'checkbox'} id="login" name='login' className='checkbox' style={{cursor:"pointer"}} onChange ={handleChange}/>
            </p>
            <div className='wrapper'>
            <button type="submit" className='btn btn-primary' onClick={login}>Login</button>
            </div>    
      </div>
    </div>
  </div>
  )
    }