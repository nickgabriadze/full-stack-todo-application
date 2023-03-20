import { useEffect, useState } from "react";
import settingsStyles from "../settings.module.css";
import { useParams } from "react-router-dom";

export const PreferencesSettings = () => {
  const username = useParams().username;
  const stayLoggedInStatus =
    window.localStorage.getItem("stayLoggedIn")?.toString() === "true"
      ? true
      : false;

  const [checked, setChecked] = useState<boolean>(stayLoggedInStatus);

  useEffect(() => {
    if (checked) {
      window.localStorage.setItem(
        "username",
        username === undefined ? "" : username
      );
      window.localStorage.setItem("stayLoggedIn", "true");
    } else {
      window.localStorage.removeItem("username");
      window.localStorage.removeItem("stayLoggedIn");
    }
  }, [checked]);

  return (
    <>
      <div className={settingsStyles["preference-wrapper"]}>
        <h1>Stay logged in</h1>

        <div
          className={settingsStyles["checkbox"]}
          onClick={() => {
            setChecked((prev) => !prev);
          }}
        >
          {checked ? (
            <img
              className={settingsStyles["check"]}
              src={"/button-checked-icon.svg"}
            ></img>
          ) : (
            <img
              className={settingsStyles["uncheck"]}
              src={"/button-unchecked-icon.svg"}
            ></img>
          )}
        </div>
      </div>
    </>
  );
};
