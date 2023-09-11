import './App.css';
import React, { useState, useEffect} from "react";
import { Route, Routes, useLocation} from "react-router-dom";
import { Login } from "./account/component/Login";
import { GuidedSearch } from "./search/component/GuidedSearch"
import { NotFound } from './notFound/component/NotFound';
import { Admin } from './account/component/Admin';
import { Database } from './account/component/Database';
import { AccountsList } from './account/component/AccountsList';
import { CreateAccount } from './account/component/CreateAccount';
import { AccountDetail } from './account/component/AccountDetail';
import { DirectSearch } from './search/component/DirectSearch';
import { CreateApplication } from './product/component/CreateApplicaiton';
import { ApplicationDetail } from './product/component/ApplicationDetail';
import { Results } from './search/component/Result';
import { Submittal } from './search/component/Submittal';
import Navbar from './search/component/Navbar';

export const getAccountID = _ => {
  let token;
  if (localStorage.getItem("rememberMe") === "true")
    token = localStorage.getItem("u");
  else
    token = sessionStorage.getItem("u");
  return fetch("/api/authenticatelogin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      token: token
    })
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data.accountID)
      return String(data.accountID);
    })
    .catch(error => {
      console.log(error);
      return "none";
    });
};

export const logOut = _ => {
  let accountID = "none";
  getAccountID().then(res => accountID = res)
  console.log(accountID + " logout successfully")
  sessionStorage.removeItem("u");
  localStorage.removeItem("u");
  localStorage.removeItem("rememberMe");
};

function App() {
  const location = useLocation();
  return (
    <div className="App">
      {(location.pathname === "/directsearch" ||
        location.pathname === "/directSearch" ||
        location.pathname === "/guidedsearch" ||
        location.pathname === "/results" ||
        location.pathname === "/submittal") && (
        <div>
          <Navbar /> 
      </div>
        )}
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/login" element={<Login/>}/>
        {/* Hilti Engineer Pages */}
        <Route path="/directsearch" element={<DirectSearch/>}/>
        <Route path="/guidedsearch" element={<GuidedSearch/>}/>
        <Route path="/results" element={<Results/>}/>
        <Route path="/submittal" element={<Submittal/>}/>
        {/* Hilti Admin Pages */}
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/database" element={<Database/>}/>
        <Route path="/accountlist" element={<AccountsList/>}/>
        <Route path="/accountlist/create" element={<CreateAccount/>}/>
        <Route path="/accountlist/detail/:id" element={<AccountDetail />} />
        <Route path="/application/create" element={<CreateApplication/>}/>
        <Route path="/application/detail/:id" element={<ApplicationDetail/>}/>
        <Route path="*" element = {<NotFound/>}/>
        
      </Routes>
    </div>
  );
}

export default App;
