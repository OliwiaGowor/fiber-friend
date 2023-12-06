import { useState } from "react";
import { defer, json, useNavigate, useRouteLoaderData } from "react-router-dom";
import classes from './ChangePasswordPage.module.scss'
import { tokenLoader } from "../../utils/auth";
import { Button, TextField } from "@mui/material";
import PasswordValidation from "../../components/PasswordVaildation/PasswordVaildation";
import { useAppDispatch } from '../../utils/hooks';
import { handleRequest } from "../../utils/handleRequestHelper";
import { setError } from "../../reducers/errorSlice";
//TODO: write post funtcion to change password 
const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [currPassword, setCurrPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repPassword, setRepPassword] = useState("");

  const checkRepPassword = () => {
    return newPassword === repPassword;
  };

  const checkCurrentPassword = async () => {
    try {
      const data = await handleRequest(
        `${process.env.REACT_APP_API_URL}Auth/CheckPassword/${localStorage.getItem("userId")}`,
        "POST",
        "Could not fetch user. Please try again later.",
        tokenLoader(),
        currPassword
      );
      return true;
    } catch (err) {
      dispatch(setError(err));
      return false;
    }
  };

  const handlePasswordChange = async () => {
    if (checkRepPassword()) {
      if (await checkCurrentPassword()) {
        try {
          await handleRequest(
            `${process.env.REACT_APP_API_URL}Auth/ChangeUserPassword/${localStorage.getItem("userId")}`,
            "PATCH",
            "Could not change password. Please try again later.",
            tokenLoader(),
            newPassword
          );

         dispatch(setError("Password changed successfully!"));
          navigate("/fiber-friend/account");
        } catch (error) {
          dispatch(setError(error));
          return;
        }
      }
    }
  }

  return (
    <div className={classes.container}>
      <h1 className={classes.header}>Change password</h1>
      <div className={classes.sectionContainer}>
        <TextField
          className={classes.formInput}
          type="password"
          label="Your current password"
          value={currPassword}
          onChange={(e) => setCurrPassword(e.target.value)}
        />
        <PasswordValidation getPassword={setNewPassword}
          showError={false} />
        <TextField
          className={classes.formInput}
          type="password"
          label="Repeat new password"
          value={repPassword}
          onChange={(e) => setRepPassword(e.target.value)}
        />
        <Button 
        className={classes.submitBtn}
        onClick={handlePasswordChange}
        >
          Change password
          </Button>
      </div>
    </div>
  );
}

export default ChangePasswordPage;