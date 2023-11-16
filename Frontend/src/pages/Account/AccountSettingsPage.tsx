import { useState } from "react";
import { defer, json, useRouteLoaderData } from "react-router-dom";
import classes from './AccountSettingsPage.module.scss'

const AccountSettingsPage = () => {
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
          <div className={classes.formInput}>
            <label>Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className={classes.formInput}>
            <label>Email:</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <h2>Access</h2>
          <button className={classes.toggleButton} onClick={handleChangePassword}>Change your password</button>
          <button className={classes.toggleButton} onClick={handleDeleteAccount}>Delete account</button>
        </div>
      </div>
    </div>
  );
}

export default AccountSettingsPage;

async function loadUserData() {
  const response = await fetch(`${process.env.REACT_APP_API_URL}Project${process.env.REACT_APP_ENV === "dev" ? "" : ".json"}`);

  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch events.' };
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