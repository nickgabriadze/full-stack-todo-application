import { useState } from "react";
import settingsStyle from "./settings.module.css";
import PasswordSettings from "./small-components/password/settings-password";
import { PreferencesSettings } from "./small-components/preferences";
import UsernameSettings from "./small-components/settings-username";

interface Settings {
  username: boolean;
  password: boolean;
  preferences: boolean;
  account: boolean
}

export const Settings = () => {
  const [options, setOptions] = useState<Settings>({
    username: true,
    password: false,
    preferences: false,
    account: false
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
                  account: false
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
                  account: false
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
                  account: false
                });
              }}
            >
              <img src={"/preferences-icon.svg"}></img>
              <h3>Preferences</h3>
            </div>

            <div
              className={settingsStyle["account"]}
              style={{
                backgroundColor: options.account ? "#633cab" : "inherit",
                color: options.account ? "white" : "inherit",
              }}
              onClick={() => {
                setOptions({
                  ...options,
                  username: false,
                  password: false,
                  preferences: false,
                  account: true
                });
              }}
            >
              <img src={"/account-icon.svg"}></img>
              <h3>Account</h3>
            </div>
          </div>

          <hr className={settingsStyle["straight-line-hr"]}></hr>

          <div className={settingsStyle["changing-area"]}>
            {options.username && <UsernameSettings/>}
            {options.password && <PasswordSettings/>}
            {options.preferences && <PreferencesSettings/>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
