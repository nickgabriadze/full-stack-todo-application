import Head from "../head";
import loginStyle from "./login.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { sha256 } from "js-sha256";
import formChecker, { checkReceivedData } from "./login-checker";
import { useAppDispatch } from "../../store/hooks";
import {
  setStayLoggedIn,
  setTodoerUsername,
} from "../../store/slices/userSlice";
import { stayLoggedIn } from "../../utils/manageActive";


const PopUp = () => {
  return (
    <div className={loginStyle["pop-up-wrapper"]}>
      <h3>
        You've logged in successfully and will be redirected to your own page in
        a few seconds
      </h3>
    </div>
  );
};

export const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [receivedData, setReceivedData] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessageForUser, setErrorMessageForUser] = useState<string>("");
  const [stayLoggedInColor, setStayLoggedInColor] = useState<string>('false');
  const [popUp, setPopUp] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const loginUser = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await  axios
        .post("http://localhost:3001/login", {
          username: username,
          password: sha256(password),
        })

        const result = response.data;
      
        setReceivedData(result);
        
    } catch (err) {
      console.log(err);
    }finally{
      setIsLoading(false)
     
    }
  };

  useEffect(() => {
    if(receivedData.length != 0){
      const finalCheck = checkReceivedData(username, receivedData);
      if(finalCheck === true) {
        stayLoggedIn(username, stayLoggedInColor);
        dispatch(setTodoerUsername(username));
        dispatch(setStayLoggedIn(stayLoggedInColor));
        setPopUp(true);
        handleRoutingAfterLogIn();
        
      }else{
        setErrorMessageForUser(finalCheck);
      }
    }
  }, [receivedData])


  const handleRoutingAfterLogIn = () => {
    setTimeout(() => {
      window.location.href = `/account/${username}`;
    }, 2500);
  };

  return (
    <>
      <Head title={"Log In"} />

      <div
        className={loginStyle["login-wrapper"]}
        style={popUp ? { filter: `blur(2px)` } : { filter: `blur(0px)` }}
      >
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
            type="text"
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
            setStayLoggedInColor(stayLoggedInColor === 'true' ? 'false' : 'true');
          }}
          className={loginStyle["stay-loggedin"]}
        >
          <button
            type="submit"
            style={{
              backgroundColor: `${
                stayLoggedInColor ? "rgb(64, 64, 100)" : "#b5a9cc"
              }`,
            }}
          >
            Stay logged in
          </button>
        </div>

        <button
          type={"submit"}
          onClick={() => {
            const validForm = formChecker(username, password);
            if(validForm === true){
              loginUser(username, password);
            }else{
              setErrorMessageForUser(validForm.toString());
            }
          }}
          className={loginStyle["login-btn"]}
        >
          {isLoading ? "Loading...": `Continue`}
        </button>
      </div>
      {popUp ? <PopUp /> : ""}
    </>
  );
};
