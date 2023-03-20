import { useParams } from "react-router-dom";
import { useState } from "react";
import settingsStyles from "../settings.module.css";
import checkUopdatedPass from "./checkUpdatedPass";
import { changePassword, checkCurrentPass } from "./api";
import { handleLogout } from "../../../../homepage/home";


export const PasswordSettings = () => {
  const username = useParams().username;
  const [currentPass, setCurrentPass] = useState<string>("");
  const [newPass, setNewPass] = useState<string>("");
  const [confirmNewPass, setConfirmNewPass] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string | boolean>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);



  const handleSubmit = async () => {
    const checked = checkUopdatedPass(currentPass, newPass, confirmNewPass);
    setErrorMsg(checked);
    if (checked === true) {
      setLoading(true);
      try {
        const request = checkCurrentPass(
          username === undefined ? "" : username,
          currentPass
        );
        const response = (await request).data;
        if (response === true) {
          setUpdateLoading(true);
          try {

            const request = changePassword(username === undefined ? "" : username,newPass);
            const response = (await request).data;
            console.log(response);
            
            if(response === true){
                setErrorMsg("Your password has been updated successfully. Please log in again.");
                setTimeout(() => {
                    handleLogout();
                }, 3000)
            }else{
                setErrorMsg("Faild to update your password")
            }
            
          } catch (err) {
          } finally {
            setUpdateLoading(false);
          }
        } else {
          setErrorMsg("Current password is invalid");
        }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <div className={settingsStyles["outer-wrapper-pswd"]}>
        <div className={settingsStyles["password-wrapper"]}>
          <div className={settingsStyles["old-password"]}>
            <h4>Confirm current password</h4>
            <input
              onFocus={() => setErrorMsg("")}
              onChange={(e) => setCurrentPass(e.target.value)}
              value={currentPass}
              type={"password"}
            ></input>
          </div>
          <div className={settingsStyles["new-password"]}>
            <h4>Type your new password</h4>
            <input
              onFocus={() => setErrorMsg("")}
              onChange={(e) => setNewPass(e.target.value)}
              value={newPass}
              type={"password"}
            ></input>
          </div>

          <div className={settingsStyles["repeat-new-password"]}>
            <h4>Confirm your new password</h4>
            <input
              onFocus={() => setErrorMsg("")}
              onChange={(e) => setConfirmNewPass(e.target.value)}
              value={confirmNewPass}
              type={"password"}
            ></input>
          </div>

          <div className={settingsStyles["update-password"]}>
            <button
              type={"submit"}
              onClick={() => {
                handleSubmit();
              }}
            >
              Update
            </button>
          </div>
        </div>

        <div className={settingsStyles["errors"]}>
          <h4>{loading ? "Loading..." : errorMsg}</h4>
        </div>
      </div>
    </>
  );
};

export default PasswordSettings;
