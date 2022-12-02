import React, { useEffect, useState, SyntheticEvent } from "react";
import {  Route, Routes } from "react-router-dom";

import { NavBar } from "./components/NavBar/NavBar";

import {Home} from './Pages/Home/Home'
import { Login } from "./Pages/Login/Login";


import "./App.scss";


function App() {

  const [name, setName] = useState('');
  const [user, setUser]=useState({})
  const [pending, setPending] = useState(false);

  return (
    <>
  
    

      <NavBar name={name}  setName={setName}/>
      <div>
          <Routes>
            <Route path="/login" element={<Login/>} />
            
            <Route path="/" element={<Home />} />
          
          </Routes>
      </div>
    </>
  );
}

export default App;