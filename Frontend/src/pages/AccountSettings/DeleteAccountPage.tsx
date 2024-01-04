import React, { useState } from "react";
import classes from './DeleteAccountPage.module.scss';
import { tokenLoader } from "../../utils/auth";
import { Button, TextField } from "@mui/material";
import { useAppDispatch } from '../../utils/hooks';
import { handleRequest } from "../../utils/handleRequestHelper";
import { action as logoutAction } from "../../utils/logout";
import { setError } from "../../reducers/errorSlice";
import { useTranslation } from "react-i18next";

const ChangePasswordPage = () => {
  const { t } = useTranslation("DeleteAccountPage");
  const dispatch = useAppDispatch();
  const [currPassword, setCurrPassword] = useState("");
  const [repPassword, setRepPassword] = useState("");

  const checkRepPassword = () => repPassword === currPassword;

  const handleDeleteAccount = async () => {
    if (checkRepPassword()) {
      if (await checkCurrentPassword()) {
        try {
          await handleRequest(
            `${process.env.REACT_APP_API_URL}User/${localStorage.getItem("userId")}${process.env.REACT_APP_ENV === "dev" ? "" : ".json"}`,
            "DELETE",
            t('errorMessage'),
            tokenLoader(),
          );

          logoutAction();
        } catch (error) {
          dispatch(setError(error));
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
      }

      const data = await response.json();
      return data;
    } catch (err) {
      throw new Error('Something went wrong!');
    }
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.header}>{t('header')}</h1>
      <div className={classes.sectionContainer}>
        <TextField
          className={classes.formInput}
          type="text"
          label={t('formInputLabel')}
          value={currPassword}
          onChange={(e) => setCurrPassword(e.target.value)}
        />
        <TextField
          className={classes.formInput}
          type="text"
          label={t('repPasswordInputLabel')}
          value={repPassword}
          onChange={(e) => setRepPassword(e.target.value)}
        />
        <Button
          className={classes.submitBtn}
          onClick={handleDeleteAccount}
        >
          {t('deleteAccountButton')}
        </Button>
      </div>
    </div>
  );
}

export default ChangePasswordPage;
