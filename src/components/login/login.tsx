import Head from "../head";
import loginStyle from "./login.module.css";
import { useState } from "react";
import axios from "axios";

export const Login = () => {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("")
  
  const loginUser = (username: string, password: string) => {
    axios.post("http://localhost:3001/login", {username: username, password: password}).then(
      (res:any) => console.log(res.data)
    ).catch(err => {
      setError(err)
    })
  }

    const handleSubmit = (e:any) => {
      e.preventDefault();
      loginUser(username, password);
    }

  return (
    <>
     <Head title={"Log In"}/>

      <div className={loginStyle['login-wrapper']}>

          <div className={loginStyle['login-header']}>
              <h1>LOG IN FORM</h1>
          </div>

            <div className={loginStyle['username-input']}>
                <input type="text" className={loginStyle['username']}
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                required></input>
                <label className={loginStyle['username-label']}>Username</label>
            </div>

            
            <div className={loginStyle['password-input']}>
                <input type="password" className={loginStyle['password']} 
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required></input>
                <label className={loginStyle['password-label']}>Password</label>
            </div>

            <button type={"submit"} 
            onClick={(e) => {
                handleSubmit(e);
            }}
            className={loginStyle['login-btn']}>Continue</button>

      </div>
    </>
  );
};
