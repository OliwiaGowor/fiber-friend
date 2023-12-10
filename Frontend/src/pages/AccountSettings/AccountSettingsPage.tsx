import { useState } from "react";
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import classes from './AccountSettingsPage.module.scss'
import { tokenLoader } from "../../utils/auth";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyIcon from '@mui/icons-material/Key';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import InfoIcon from '@mui/icons-material/Info';
import { useAppDispatch } from '../../utils/hooks';
import { handleRequest } from "../../utils/handleRequestHelper";
import { setError } from "../../reducers/errorSlice";
import { useTranslation } from "react-i18next";

const AccountSettingsPage = () => {
  const {t, i18n} = useTranslation("AccountSettingsPage");
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
      <h1 className={classes.header}>{t('header')}</h1>
      <div className={classes.sectionContainer}>
        <h2 className={classes.sectionHeader}>{t('generalSection')}</h2>
        <TextField
          className={classes.formInput}
          type="text"
          label={t('usernameLabel')}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          className={classes.formInput}
          type="text"
          label={t('emailLabel')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          className={classes.saveButton}
          variant="contained"
          onClick={handleSave}
        >
           {t('saveButton')}
        </Button>
      </div>
      <div className={classes.sectionContainer}>
        <h2 className={classes.sectionHeader}>{t('languageSection')}</h2>
        <Select
          className={classes.languageSelect}
          value={i18n.language}
          onChange={(e) => i18n.changeLanguage(e.target.value as string)}
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="pl">Polski</MenuItem>
        </Select>
      </div>
      <div className={classes.sectionContainer}>
        <h2 className={classes.sectionHeader}>{t('accessSection')}</h2>
        <button
          className={classes.settingsButton}
          onClick={() => navigate("change-password")}
        >
          <KeyIcon className={classes.icon} />
          {t('changePasswordButton')}
          <ArrowForwardIosIcon className={classes.arrowIcon} />
        </button>
        <button
          className={classes.settingsButton}
          onClick={() => navigate("delete-account")}
        >
          <PersonRemoveIcon className={classes.icon} />
          {t('deleteAccountButton')}
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
          {t('aboutButton')}
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
          {t('contactUsButton')}
          <ArrowForwardIosIcon className={classes.arrowIcon} />
        </button>
        <button
          className={classes.settingsButton}
          onClick={() => navigate('/fiber-friend/report-problem')}
        >
          <PersonRemoveIcon className={classes.icon} />
          {t('reportProblemButton')}
          <ArrowForwardIosIcon className={classes.arrowIcon} />
        </button>
      </div>
    </div>
  );
}

export default AccountSettingsPage;