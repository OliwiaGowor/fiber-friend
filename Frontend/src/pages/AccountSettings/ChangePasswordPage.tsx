import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import classes from './ChangePasswordPage.module.scss';
import { tokenLoader } from "../../utils/auth";
import { Button, TextField } from "@mui/material";
import PasswordValidation from "../../components/PasswordVaildation/PasswordVaildation";
import { useAppDispatch } from '../../utils/hooks';
import { handleRequest } from "../../utils/handleRequestHelper";
import { setError } from "../../reducers/errorSlice";

const ChangePasswordPage = () => {
  const { t } = useTranslation('ChangePasswordPage');
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
        t('checkPasswordErrorMessage'),
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
            t('errorMessage'),
            tokenLoader(),
            newPassword
          );

          dispatch(setError(t('successMessage')));
          navigate("/fiber-friend/account");
        } catch (error) {
          dispatch(setError(error));
        }
      }
    }
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.header}>{t('header')}</h1>
      <div className={classes.sectionContainer}>
        <TextField
          className={classes.formInput}
          type="password"
          label={t('currentPasswordLabel')}
          value={currPassword}
          onChange={(e) => setCurrPassword(e.target.value)}
        />
        <PasswordValidation getPassword={setNewPassword} showError={false} />
        <TextField
          className={classes.formInput}
          type="password"
          label={t('repeatPasswordLabel')}
          value={repPassword}
          onChange={(e) => setRepPassword(e.target.value)}
        />
        <Button 
          className={classes.submitBtn}
          onClick={handlePasswordChange}
        >
          {t('changePasswordBtn')} 
        </Button>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
