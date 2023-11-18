import { useState } from "react";
import { defer, json, useRouteLoaderData } from "react-router-dom";
import classes from './AccountSettingsPage.module.scss'
import { tokenLoader } from "../../utils/auth";
import { Button, TextField } from "@mui/material";
import TextInput from "../../components/TextInput/TextInput";

const ChangePasswordPage = () => {
  const { userData }: any = {username: "", email: ""}//useRouteLoaderData('account');
  const [username, setUsername] = useState(userData?.username ?? "");
  const [email, setEmail] = useState(userData?.email ?? "");

  const handleChangePassword = () => {

  };

  const handleDeleteAccount = () => {

  };

  return (
    <div className={classes.container}>
      <div className={classes.formContent}>
        <div className={classes.sectionContainer}>
          <h1 className={classes.header}>Account settings</h1>
          <h2>General</h2>
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
          <h2>Access</h2>
          <h3>Change password</h3>
          <TextField 
          className={classes.formInput}
          type="text" 
          value={email} onChange={(e) => setEmail(e.target.value)} />
          <Button className={classes.button} onClick={handleDeleteAccount}>Delete account</Button>
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordPage;

async function loadUserData() {  
  const response = await fetch(`${process.env.REACT_APP_API_URL}Project${process.env.REACT_APP_ENV === "dev" ? "" : ".json"}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer " + tokenLoader(),
      },
  });

  if (!response.ok) {
    // return { isError: true, message: 'Could not  events.' };
    // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
    //   status: 500,
    // });
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