import { useState } from "react";
import settingsStyle from "./settings.module.css";
import PasswordSettings from "./small-components/settings-password";
import UsernameSettings from "./small-components/settings-username";

interface Settings {
  username: boolean;
  password: boolean;
  preferences: boolean;
}

export const Settings = () => {
  const [options, setOptions] = useState<Settings>({
    username: true,
    password: false,
    preferences: false,
  });


  return (
    <>
      <div className={settingsStyle['settings-center']}>
        <div className={settingsStyle["settings-wrapper"]}>
          <div className={settingsStyle["what-to-change"]}>
            <div
              className={settingsStyle["username"]}
              style={{
                backgroundColor: options.username ? "#633cab" : "inherit",
                color: options.username ? "white" : "inherit",
              }}
              onClick={() => {
                setOptions({
                  ...options,
                  username: true,
                  password: false,
                  preferences: false,
                });
              }}
            >
              <img src={"/user-icon.svg"}></img>
              <h3>Username</h3>
            </div>

            <div
              className={settingsStyle["password"]}
              style={{
                backgroundColor: options.password ? "#633cab" : "inherit",
                color: options.password ? "white" : "inherit",
              }}
              onClick={() => {
                setOptions({
                  ...options,
                  username: false,
                  password: true,
                  preferences: false,
                });
              }}
            >
              <img src={"/password-icon.svg"}></img>
              <h3>Password</h3>
            </div>

            <div
              className={settingsStyle["preferences"]}
              style={{
                backgroundColor: options.preferences ? "#633cab" : "inherit",
                color: options.preferences ? "white" : "inherit",
              }}
              onClick={() => {
                setOptions({
                  ...options,
                  username: false,
                  password: false,
                  preferences: true,
                });
              }}
            >
              <img src={"/preferences-icon.svg"}></img>
              <h3>Preferences</h3>
            </div>
          </div>

          <hr className={settingsStyle["straight-line-hr"]}></hr>

          <div className={settingsStyle["changing-area"]}>
            {options.username && <UsernameSettings/>}
            {options.password && <PasswordSettings/>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
