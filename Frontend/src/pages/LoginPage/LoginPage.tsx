import React from "react";
import { useState } from "react";
import { Form, Link, json, redirect, useNavigate, useNavigation } from "react-router-dom";
import { useAppDispatch } from '../../utils/hooks';

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import classes from "./LoginPage.module.scss";
import { handleRequest } from "../../utils/handleRequestHelper";
import { setError } from "../../reducers/errorSlice";
import { useTranslation } from "react-i18next";

export default function LoginPage() {
    const { t } = useTranslation('LoginPage');
    const navigation = useNavigation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isSubmitting = navigation.state === 'submitting';
    const [showPassword, setShowPassword] = useState(false);
    const [showEmailError, setShowEmailError] = useState<boolean>(false);
    const [showPasswordError, setShowPasswordError] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (email === '' || email.length < 3) {
            setShowEmailError(true);
        }

        if (password === '' || password.length < 8) {
            setShowPasswordError(true);
            return;
        }

        const authData = {
            email: email,
            password: password,
        };

        try {
            const data = await handleRequest(
                `${process.env.REACT_APP_API_URL}auth/Login`,
                "POST",
                "Could not authenticate user.",
                null,
                authData
            );
            const expiration = new Date();
            const token = data.token;
            const userId = data.id;
    
            localStorage.setItem("token", token);
            localStorage.setItem("userId", userId);
            expiration.setTime(expiration.getTime() + 1 * 60 * 60 * 1000);
            localStorage.setItem("expiration", expiration.toISOString());
    
            return navigate("/fiber-friend/account");
    
        } catch (error) {
            dispatch(setError(error));
        }
    };

    return (
        <div className={classes.container}>
            <div className={classes.sidePanel}>
                <h1 className={classes.panelHeader}>{t('welcomeBack')}</h1>
                <p className={classes.panelText}>{t('dontHaveAccount')}</p>
                <Button className={classes.btnSignup} onClick={() => navigate('/fiber-friend/signUp')}>
                    {t('signUp')}
                </Button>
            </div>
            <div className={classes.loginForm}>
                <Form className={classes.form} method="post" onSubmit={handleSubmit}>
                    <h1>{t('logIn')}</h1>
                    <div className={classes.loginFormContainer}>
                        <div className={classes.formSection}>
                            <TextField
                                id="email"
                                inputProps={{
                                    'aria-label': 'email',
                                }}
                                label="Email"
                                className={classes.formInput}
                                name='email'
                                error={showEmailError}
                                helperText={showEmailError ? 'Enter email!' : ''}
                                onChange={(e) => {
                                    setShowEmailError(false);
                                    setEmail(e.target.value)
                                }}
                                autoFocus
                            />
                        </div>
                        <div className={classes.formSection}>
                            <TextField
                                id="password"
                                inputProps={{
                                    'aria-label': 'password',
                                }}
                                label={t('password')}
                                className={classes.formInput}
                                name='password'
                                error={showPasswordError}
                                helperText={showPasswordError ? 'Enter password!' : ''}
                                onChange={(e) => {
                                    setShowPasswordError(false);
                                    setPassword(e.target.value)
                                }}
                                type={showPassword ? 'text' : 'password'}
                                InputProps={{
                                    endAdornment:
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                }}
                            />
                        </div>
                    </div>
                    <div className={classes.btnContainer}>
                        <Button
                            variant="contained"
                            className={classes.btnSubmit}
                            disabled={isSubmitting}
                            type="submit"
                        >
                            {isSubmitting ? t('loggingIn') : t('logIn')}
                        </Button>
                        <Link to='/fiber-friend/recover-password'>
                            <div className={classes.forgotPassword}>
                                {t('forgotPassword')}
                            </div>
                        </Link>
                    </div>
                </Form>
            </div>
        </div>
    );
}