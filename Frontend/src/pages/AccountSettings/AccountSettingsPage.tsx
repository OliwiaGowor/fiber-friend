import { useState } from "react";
import { defer, json, useNavigate, useRouteLoaderData } from "react-router-dom";
import classes from './AccountSettingsPage.module.scss'
import { tokenLoader } from "../../utils/auth";
import { Button, TextField } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyIcon from '@mui/icons-material/Key';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

const AccountSettingsPage = () => {
  const navigate = useNavigate();
  const { userData }: any = { username: "", email: "" }//useRouteLoaderData('account');
  const [username, setUsername] = useState(userData?.username ?? "");
  const [email, setEmail] = useState(userData?.email ?? "");

  return (
    <div className={classes.container}>
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
        <h2 className={classes.sectionHeader}>Language</h2>
        
      </div>
      <div className={classes.sectionContainer}>
        <h2 className={classes.sectionHeader}>Access</h2>
        <button
          className={classes.settingsButton}
          onClick={() => navigate("change-password")}
        >
          <KeyIcon className={classes.icon} />
          Change your password
          <ArrowForwardIosIcon className={classes.arrowIcon} />
        </button>
        <button
          className={classes.settingsButton}
          onClick={() => navigate("delete-account")}
        >
          <PersonRemoveIcon className={classes.icon} />
          Delete account
          <ArrowForwardIosIcon className={classes.arrowIcon} />
        </button>
      </div>
    </div>
  );
}

export default AccountSettingsPage;

async function loadUserData() {
  const response = await fetch(`${process.env.REACT_APP_API_URL}User${process.env.REACT_APP_ENV === "dev" ? "" : ".json"}`, {
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