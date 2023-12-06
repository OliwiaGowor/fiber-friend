import { useState } from "react";
import { defer, json, useNavigate, useRouteLoaderData } from "react-router-dom";
import classes from './AccountSettingsPage.module.scss'
import { tokenLoader } from "../../utils/auth";
import { Button, TextField } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyIcon from '@mui/icons-material/Key';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import InfoIcon from '@mui/icons-material/Info';
import { useAppDispatch } from '../../utils/hooks';
import { handleRequest } from "../../utils/handleRequestHelper";
import { setError } from "../../reducers/errorSlice";

const AccountSettingsPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userData } = useRouteLoaderData('account') as { userData: { username: string; email: string } };
  const [username, setUsername] = useState(userData?.username ?? "");
  const [email, setEmail] = useState(userData?.email ?? "");

  const handleSave = async () => {
    const data = {
      id: localStorage.getItem("userId"),
      username: username,
      email: email,
    };
    try {
      await handleRequest(
        `${process.env.REACT_APP_API_URL}User/UserData/${localStorage.getItem("userId")}`,
        "PATCH",
        "Could not update user data. Please try again later.",
        tokenLoader(),
        data,
      );
      
      window.location.reload();
    } catch (error) {
      dispatch(setError(error));
    }
  };

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
        <Button
          className={classes.saveButton}
          variant="contained"
          onClick={handleSave}
        >
          Save
        </Button>
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
      <div className={classes.sectionContainer}>
        <h2 className={classes.sectionHeader}>Useful links</h2>
        <button
          className={classes.settingsButton}
          onClick={() => navigate("")}
        >
          <InfoIcon className={classes.icon} />
          About
          <ArrowForwardIosIcon className={classes.arrowIcon} />
        </button>
      </div>
      <div className={classes.sectionContainer}>
        <h2 className={classes.sectionHeader}>Contact</h2>
        <button
          className={classes.settingsButton}
          onClick={() => navigate("fiber-friend/contact-us")}
        >
          <KeyIcon className={classes.icon} />
          Contact us
          <ArrowForwardIosIcon className={classes.arrowIcon} />
        </button>
        <button
          className={classes.settingsButton}
          onClick={() => navigate('/fiber-friend/report-problem')}
        >
          <PersonRemoveIcon className={classes.icon} />
          Report problem
          <ArrowForwardIosIcon className={classes.arrowIcon} />
        </button>
      </div>
    </div>
  );
}

export default AccountSettingsPage;