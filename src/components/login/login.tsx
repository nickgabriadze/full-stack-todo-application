import Head from "../head";
import loginStyle from "./login.module.css";
import { useState } from "react";
import axios from "axios";
import { sha256 } from "js-sha256";
import formChecker from "./login-checker";
import { useAppDispatch } from "../../store/hooks";
import {
  setStayLoggedIn,
  setTodoerUsername,
} from "../../store/slices/userSlice";

export const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [receivedData, setReceivedData] = useState<[]>([]);
  const [errorMessageForUser, setErrorMessageForUser] = useState<string>("");
  const [stayLoggedInColor, setStayLoggedInColor] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const loginUser = (username: string, password: string) => {
    axios
      .post("http://localhost:3001/login", {
        username: username,
        password: sha256(password),
      })
      .then((res: any) => setReceivedData(res.data))
      .catch((err) => {
        setError(err);
      });
  };

  const handleRoutingAfterLogIn = () => {
   
  };

  const handleSubmit = (e: any) => {
   e.preventDefault();

    loginUser(username, password);
    const validPass = formChecker(username, password, receivedData);
    return validPass;
  };

  return (
    <>
      <Head title={"Log In"} />

      <div className={loginStyle["login-wrapper"]}>
        <div className={loginStyle["login-header"]}>
          <h1>LOG IN FORM</h1>
        </div>

        <div className={loginStyle["username-input"]}>
          <input
            type="text"
            className={loginStyle["username"]}
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
          ></input>
          <label className={loginStyle["username-label"]}>Username</label>
        </div>

        <div className={loginStyle["password-input"]}>
          <input
            type="password"
            className={loginStyle["password"]}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          ></input>
          <label className={loginStyle["password-label"]}>Password</label>
        </div>
        <p>{errorMessageForUser}</p>

        <div
          onClick={() => {
            setStayLoggedInColor(!stayLoggedInColor);
          }}
          className={loginStyle["stay-loggedin"]}
        >
          <p
            style={{
              backgroundColor: `${
                stayLoggedInColor ? "rgb(64, 64, 100)" : "#b5a9cc"
              }`,
            }}
          >
            Stay logged in
          </p>
        </div>

        <button
          type={"submit"}
          onClick={(e) => {
            const handledSubmit = handleSubmit(e);
            if (handledSubmit === true) {
              dispatch(setTodoerUsername(username));
              dispatch(setStayLoggedIn(stayLoggedInColor));

              handleRoutingAfterLogIn();
            } else {
              setErrorMessageForUser(handledSubmit.toString());
            }
          }}
          className={loginStyle["login-btn"]}
        >
          Continue
        </button>
      </div>
    </>
  );
};
