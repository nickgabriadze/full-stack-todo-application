import Head from "../head";
import loginStyle from "./login.module.css";

export const Login = () => {

  


  return (
    <>
     <Head title={"Log In"}/>

      <div className={loginStyle['login-wrapper']}>

          <div className={loginStyle['login-header']}>
              <h1>LOG IN FORM</h1>
          </div>

            <div className={loginStyle['username-input']}>
                <input type="text" className={loginStyle['username']} required></input>
                <label className={loginStyle['username-label']}>Username</label>
            </div>

            
            <div className={loginStyle['password-input']}>
                <input type="password" className={loginStyle['password']} required></input>
                <label className={loginStyle['password-label']}>Password</label>
            </div>

            <button type={"submit"} className={loginStyle['login-btn']}>Continue</button>

      </div>
    </>
  );
};
