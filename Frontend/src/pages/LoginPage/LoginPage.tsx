import React from "react";
import { useState } from "react";
import { Form, Link, json, redirect, useNavigate, useNavigation } from "react-router-dom";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import classes from "./LoginPage.module.scss";

export default function LoginPage() {
    const navigation = useNavigation();
    const navigate = useNavigate();
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

        try {
            await action({
                request: new Request("/fiber-friend/login", {
                    method: "POST",

                    body: new FormData(event.currentTarget),
                })
            });
        } catch (error) {
            localStorage.setItem("error", "Something went wrong, please try again later.");
        }
    };

    return (
        <div className={classes.container}>
            <div className={classes.sidePanel}>
                <h1 className={classes.panelHeader}>Welcome back!</h1>
                <p className={classes.panelText}>Don't have an account?</p>
                <Button className={classes.btnSignup} onClick={() => navigate('/fiber-friend/signUp')}>
                    Sign up
                </Button>
            </div>
            <div className={classes.loginForm}>
                <Form className={classes.form} method="post" onSubmit={handleSubmit}>
                    <h1>Log in</h1>
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
                                label="Password"
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
                            {isSubmitting ? "Logging in..." : "Log in"}
                        </Button>
                        <Link to='/fiber-friend/recover-password'>
                            <div className={classes.forgotPassword}>
                                Forgot password?
                            </div>
                        </Link>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export async function action({ request }: { request: Request }) {
    const data = await request.formData();

    const authData = {
        email: data.get("email"),
        password: data.get("password"),
    };

    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/Login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(authData),
        });

        if (!response.ok) {
            throw json({ message: "Could not authenticate user." }, { status: 500 });
            return null;
        }

        const resData = await response.json();
        const expiration = new Date();
        const token = resData.token;
        const userId = resData.id;

        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        expiration.setTime(expiration.getTime() + 1 * 60 * 60 * 1000);
        localStorage.setItem("expiration", expiration.toISOString());

        return redirect("/account");

    } catch (error) {
        localStorage.setItem("error", "Something went wrong, please try again later.");

        return null;
    }
}