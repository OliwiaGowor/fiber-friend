import { useState } from "react";
import { defer, json, useRouteLoaderData } from "react-router-dom";
import classes from './AccountSettingsPage.module.scss'
import { tokenLoader } from "../../utils/auth";
import { Button, TextField } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyIcon from '@mui/icons-material/Key';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

const AccountSettingsPage = () => {
  const { userData }: any = { username: "", email: "" }//useRouteLoaderData('account');
  const [username, setUsername] = useState(userData?.username ?? "");
  const [email, setEmail] = useState(userData?.email ?? "");


  const handleDeleteAccount = () => {

  };

  return (
    <div className={classes.container}>
      <div className={classes.formContent}>
        <h1 className={classes.header}>Account settings</h1>
        <div className={classes.sectionContainer}>
          <h2 className={classes.sectionHeader}>General</h2>
          <TextField
            className={classes.formInput}
            type="text"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            className={classes.formInput}
            type="text"
            label="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={classes.sectionContainer}>
          <h2 className={classes.sectionHeader}>Access</h2>
          <button className={classes.button}>
            <KeyIcon className={classes.icon} />
            Change password
            <ArrowForwardIosIcon className={classes.icon} />
          </button>
          <button className={classes.button} onClick={handleDeleteAccount}>
            <PersonRemoveIcon className={classes.icon} />
            Delete account
            <ArrowForwardIosIcon className={classes.icon} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccountSettingsPage;

async function loadUserData() {
  const response = await fetch(`${process.env.REACT_APP_API_URL}Project${process.env.REACT_APP_ENV === "dev" ? "" : ".json"}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: "Bearer " + tokenLoader(),
    },
  });

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch user data.' },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();

    return resData;
  }
}

export async function loader() {
  const [userData] = await Promise.all([
    loadUserData(),
  ]);

  return defer({
    userData: userData,
  });
}