import { useState } from "react";
import { useParams } from "react-router-dom";
import { handleLogout } from "../../../../homepage/home";
import settingsStyles from "../settings.module.css";
import { deleteAccount } from "./api";

export const AccountSettings = () => {
  const username = useParams().username;

  const [clickedDelete, setClickedDelete] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [note, setNote] = useState<string>(
    "Note: This action can not be undone"
  );
  const handleDelete = async () => {
    setClickedDelete(true);
    setTimeout(() => {
      setClickedDelete(false);
    }, 2000);
    if (clickedDelete) {
      setLoading(true);
      try {
        const request = deleteAccount(username === undefined ? "" : username);
        const response = (await request).data;
        
        if (response === "OK") {
          setNote(
            "Account has been deleted successfully, now you will be logged out!"
          );
          setTimeout(() => {
            handleLogout();
          }, 2000);
        }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    }
  };

  
  return (
    <>
      <div className={settingsStyles["delete-account"]}>
        <h1>Delete your account</h1>
        <div className={settingsStyles["delete-box"]}>
          <button onClick={handleDelete}>
            {clickedDelete ? "Confirm!" : "Delete"}
          </button>
          <img src={"/delete-account-icon.svg"}></img>
        </div>
        <p>{note}</p>
      </div>
    </>
  );
};

export default AccountSettings;
