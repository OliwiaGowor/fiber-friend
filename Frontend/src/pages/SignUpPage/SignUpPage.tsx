import Button from "@mui/material/Button";
import { Form, useNavigation, useNavigate, json, redirect } from "react-router-dom";
import classes from "./SignUpPage.module.scss"
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import PasswordValidation from "../../components/PasswordVaildation/PasswordVaildation";

export default function SignUpPage() {
    const navigation = useNavigation();
    const navigate = useNavigate();
    const isSubmitting = navigation.state === "submitting";
    const [showEmailError, setShowEmailError] = useState<boolean>(false);
    const [showUsernameError, setShowUsernameError] = useState<boolean>(false);
    const [showPasswordError, setShowPasswordError] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('');

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validateEmail(email)) {
            setShowEmailError(true);
        }

        if (username.length === 0) {
            setShowUsernameError(true);
        }

        if (password === '' || password.length < 8) {
            setShowPasswordError(true);
            return;
        }

        try {
            await action({
                request: new Request("/fiber-friend/signUp", {
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
                <p className={classes.panelText}>Already have an account?</p>
                <Button className={classes.btnSignin} onClick={() => navigate('/fiber-friend/login')}>
                    Sign In
                </Button>
            </div>
            <div className={classes.signUpForm}>
                <Form className={classes.form} method="post" onSubmit={handleSubmit}>
                    <h1 className={classes.header}>Sign Up</h1>
                    <div className={classes.signUpFormContainer}>
                        <div className={classes.formSection}>
                            <TextField
                                id="email"
                                inputProps={{
                                    'aria-label': 'email',
                                }}
                                label="E-mail"
                                className={classes.formInput}
                                name='email'
                                error={showEmailError}
                                helperText={showEmailError ? 'Enter e-mail!' : ''}
                                onChange={(e) => {
                                    setShowEmailError(false);
                                    setEmail(e.target.value)
                                }}
                            />
                        </div>
                        <div className={classes.formSection}>
                            <TextField
                                id="username"
                                inputProps={{
                                    'aria-label': 'username',
                                }}
                                label="Username"
                                className={classes.formInput}
                                name='username'
                                autoComplete="none"
                                error={showUsernameError}
                                helperText={showUsernameError ? 'Enter username!' : ''}
                                onChange={(e) => {
                                    setShowUsernameError(false);
                                    setUsername(e.target.value)
                                }}
                            />
                        </div>
                        <div className={classes.formSection}>
                            <PasswordValidation getPassword={setPassword} showError={showPasswordError} />
                        </div>
                    </div>
                    <div className={classes.btnContainer}>
                        <Button className={classes.btnSubmit} disabled={isSubmitting} type="submit">
                            {isSubmitting ? "Registering..." : "Register"}
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export async function action({ request }: { request: Request }) {
    const data = await request.formData();

    const authData = {
        username: data.get("username"),
        email: data.get("email"),
        password: data.get("password"),
    };

    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}`, { //FIXME: fill the url
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(authData),
        });

        if (!response.ok) {
            localStorage.setItem("error", "Something went wrong, please try again later.");
        }
        const resData = await response.json();
        const token = resData.token;

        localStorage.setItem("token", token);
        const expiration = new Date();
        expiration.setHours(expiration.getHours() + 1);
        localStorage.setItem("expiration", expiration.toISOString());

        return redirect("/account");

    } catch (error) {
        localStorage.setItem("error", "Something went wrong, please try again later.");
    }
}