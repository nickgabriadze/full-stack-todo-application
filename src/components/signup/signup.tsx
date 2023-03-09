import { useState } from "react";
import signupStyles from "./signup.module.css";
import Head from "../head";
import axios from "axios";
import {sha256} from "js-sha256";
import { checkForm } from "./signup-checker";


const responseDict: { [key: string]: string } = {
  success:
    "Hey, thanks for signing up! now you will be redirected to your homepage",
  SqlError: "Sorry, the username you are trying to register is not available",
};

export const Signup = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatedPassword, setRepeatedPassword] = useState<string>("");
  const [callResult, setCallResult] = useState<string>("");
  const [popUp, setPopup] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<string>("");

  const registerUser = (username: string, password: string) => {
    axios
      .post("http://localhost:3001/register", {
        username: username,
        password: sha256(password),
      })
      .then((res) => setCallResult(res.data))
      .catch((err: string) => {
        setCallResult(err);
      });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    registerUser(username, password);
  };

  const Popup = () => {
    if (callResult === "success") {
      setTimeout(() => {
        window.location.href = "/";
      }, 2500);
    }

    return (
      <div className={signupStyles["popup"]}>
        <p>{responseDict[callResult]}</p>

        {callResult !== "success" ? (
          <button
            className={signupStyles["close-btn-popup"]}
            onClick={() => setPopup(false)}
          >
            Close
          </button>
        ) : (
          ""
        )}
      </div>
    );
  };

  return (
    <>
      <Head title={"Sign Up"} />
      <div
        className={signupStyles["signup-wrapper"]}
        style={popUp ? { filter: `blur(2px)` } : { filter: `blur(0px)` }}
      >
        <div className={signupStyles["signup-header"]}>
          <h1>SIGN UP FORM</h1>
        </div>

        <div className={signupStyles["username-input"]}>
          <input
            type="text"
            className={signupStyles["username"]}
            maxLength={255}
            value-={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required
          ></input>
          <label className={signupStyles["username-label"]}>Username</label>
        </div>

        <div className={signupStyles["password-input"]}>
          <input
            type="password"
            className={signupStyles["password"]}
            maxLength={255}
            value-={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          ></input>
          <label className={signupStyles["password-label"]}>Password</label>
        </div>

        <div className={signupStyles["password-input"]}>
          <input
            type="password"
            className={signupStyles["password"]}
            maxLength={255}
            value-={repeatedPassword}
            onChange={(e) => {
              setRepeatedPassword(e.target.value);
            }}
            required
          ></input>
          <label className={signupStyles["password-label"]}>
            Repeat Password
          </label>
        </div>
        <p>{passwordError}</p>
        <button
          type={"submit"}
          onClick={(e) => {
            const checkResult = checkForm(username, password, repeatedPassword);
            if (checkResult === true) {
              handleSubmit(e);
              setPopup(true);
            } else {
              setPasswordError(checkResult || "");
              
            }
          }}
          className={signupStyles["login-btn"]}
        >
          Continue
        </button>
      </div>
      {popUp && <Popup />}
    </>
  );
};

export default Signup;
