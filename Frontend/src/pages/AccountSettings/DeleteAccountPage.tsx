import { useState } from "react";
import { defer, json, useRouteLoaderData } from "react-router-dom";
import classes from './DeleteAccountPage.module.scss'
import { tokenLoader } from "../../utils/auth";
import { Button, TextField } from "@mui/material";
import PasswordValidation from "../../components/PasswordVaildation/PasswordVaildation";
import { useAppDispatch } from '../../utils/hooks';
import { handleRequest } from "../../utils/handleRequestHelper";
import { action as logoutAction } from "../../utils/logout";
import { setError } from "../../reducers/errorSlice";

const ChangePasswordPage = () => {
  const dispatch = useAppDispatch();
  const [currPassword, setCurrPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repPassword, setRepPassword] = useState("");

  const checkRepPassword = () => {
    return newPassword === repPassword;
  };

  const handleDeleteAccount = async () => {
    if (checkRepPassword()) {
      if (await checkCurrentPassword()) {
        try {
          await handleRequest(
            `${process.env.REACT_APP_API_URL}User/${localStorage.getItem("userId")}${process.env.REACT_APP_ENV === "dev" ? "" : ".json"}`,
            "DELETE",
            "Could not delete account. Please try again later.",
            tokenLoader(),
          );

          logoutAction();

        } catch (error) {
          dispatch(setError(error));
          return;
        }
      }
    }
  };

  const checkCurrentPassword = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/users/check-password', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${tokenLoader()}`
        },
        body: JSON.stringify(currPassword),
      });

      if (!response.ok) {
        throw new Error('Something went wrong!');
        return false;
      }

      const data = await response.json();
      return data;
    } catch (err) {
      throw new Error('Something went wrong!');
      return false;
    }
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.header}>Delete account</h1>
      <div className={classes.sectionContainer}>
        <TextField
          className={classes.formInput}
          type="text"
          label="Your current password"
          value={currPassword}
          onChange={(e) => setCurrPassword(e.target.value)}
        />
        <TextField
          className={classes.formInput}
          type="text"
          label="Repeat password"
          value={repPassword}
          onChange={(e) => setRepPassword(e.target.value)}
        />
        <Button
          className={classes.submitBtn}
          onClick={handleDeleteAccount}
        >
          Delete account
        </Button>
      </div>
    </div>
  );
}

export default ChangePasswordPage;