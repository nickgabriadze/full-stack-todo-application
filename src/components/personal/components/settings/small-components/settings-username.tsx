import { useState, useEffect } from "react";
import settingsStyles from "../settings.module.css";
import { changeUsername, checkAvailability } from "./api";
import { useParams } from "react-router-dom";
import { handleLogout } from "../../../../homepage/home";


export const UsernameSettings = () => {
const oldUsername = useParams().username;
  const [username, setUsername] = useState<string>("");
  const [available, setAvailable] = useState<boolean>(false);
  const [loadingUsernameChange, setLoadingUsernameChange] =
    useState<boolean>(false);
    

  const [warning, setWarning] = useState({
    1: {
      chosen: false,
      notAvailable: "Sorry, username you requested is not available",
    },
    2: { chosen: false, empty: "Username field shouldn't be empty" },
    3: {
      chosen: true,
      note: `Small note: You will have to login again after you change your
        username, because you will be logged out`,
    },
  });

  const [loadingAvailability, setLoadingAvailability] =
    useState<boolean>(false);

  const handleSubmit = async () => {
    const checkEmpty = checkForEmpty();
    if (!checkEmpty) {
      if (!available) {
        setWarning({
          ...warning,
          1: { ...warning[1], chosen: true },
          2: {
            ...warning[2],
            chosen: false,
          },
          3: {
            ...warning[3],
            chosen: false,
          },
        });
      } else {
        setLoadingUsernameChange(true);
        try {
          const response = await changeUsername(username, oldUsername === undefined ? "": oldUsername);
          const data = response.data;
            if(data === "Updated"){
                handleLogout();
            }else{
                console.log(data)
            }
        } catch (err) {
        } finally {
          setLoadingUsernameChange(false);
        }
      }
    }
  };

  const checkAvailable = async () => {
    setLoadingAvailability(true);
    try {
      const response = await checkAvailability(username);
      const checked = response.data.available === 1 ? true : false;
      setAvailable(checked);
    } catch (err) {
    } finally {
      setLoadingAvailability(false);
    }
  };

  const checkForEmpty = () => {
    if (username.trim().length === 0) {
      setWarning({
        ...warning,
        1: { ...warning[1], chosen: false },
        2: {
          ...warning[2],
          chosen: true,
        },
        3: {
          ...warning[3],
          chosen: false,
        },
      });

      return true;
    }

    return false;
  };

  useEffect(() => {
    checkAvailable();
  }, [username]);

  return (
    <>
      <div className={settingsStyles["username-settings"]}>
        <h2>Change username</h2>
        <input
          onFocus={() => {
            setWarning({
              ...warning,
              1: { ...warning[1], chosen: false },
              2: {
                ...warning[2],
                chosen: false,
              },
              3: {
                ...warning[3],
                chosen: true,
              },
            });
          }}
          maxLength={255}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          value={username}
        ></input>
        {username.trim().length !== 0 && (
          <p>
            {loadingAvailability
              ? "Loading..."
              : `${username} is ${available ? "available" : "not available"}`}
          </p>
        )}
        <button
          onClick={() => {
            handleSubmit();
          }}
        >
          {loadingUsernameChange ? "Loading..." : "Submit"}
        </button>
        <p>
          {warning[1].chosen && warning[1].notAvailable}
          {warning[2].chosen && warning[2].empty}
          {warning[3].chosen && warning[3].note}
        </p>
      </div>
    </>
  );
};

export default UsernameSettings;
