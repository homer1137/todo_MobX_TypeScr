import React, { useState, SyntheticEvent } from "react";
import { useNavigate } from "react-router";
import { useFetching } from "../../hooks/useFetching";
import todos from "../../store/todos";
import { observer } from "mobx-react-lite";
import Loader from "../../components/Loader/Loader";


import "./Login.css";

type Props = {

};

export const Login=observer(({}:Props)=> {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');

  const navigate = useNavigate();


  const submit = async (e: SyntheticEvent) => {
    
    e.preventDefault();
    
      todos.login({
        login: email,
        password
      })
      
   
    setTimeout(()=>{
      if(!todos.error){
        setEmail('');
        setPassword('');
      navigate('/');
      }
    }, 1000)
    
          
   
  };

  return (
    <>
      {todos.loading&&<Loader/>}
      
      <form onSubmit={submit}>
        <div className="container">
        {todos.error&&<div className="error">{todos.error}</div>}
          <label htmlFor="email">
            <b>Login (correct: user)</b>
          </label>
          <input
            type="text"
            placeholder="Enter Login"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <label htmlFor="password">
            <b>Password (correct: 123)</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          <button type="submit">Login</button>
        </div>

      </form>
    </>
  );
})
