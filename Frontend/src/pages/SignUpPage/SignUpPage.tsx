import Button from "@mui/material/Button";
import { Form, useNavigation, useNavigate, redirect } from "react-router-dom";
import classes from "./SignUpPage.module.scss"
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import PasswordValidation from "../../components/PasswordVaildation/PasswordVaildation";
import { useAppDispatch } from '../../utils/hooks';
import { handleRequest } from "../../utils/handleRequestHelper";
import { setError } from "../../reducers/errorSlice";

export default function SignUpPage() {
    const dispatch = useAppDispatch();
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
        const emailRegex = /([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@([0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)*|\[((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|IPv6:((((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){6}|::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){5}|[0-9A-Fa-f]{0,4}::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){4}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):)?(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){3}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,2}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){2}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,3}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,4}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::)((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3})|(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3})|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,5}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3})|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,6}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::)|(?!IPv6:)[0-9A-Za-z-]*[0-9A-Za-z]:[!-Z^-~]+)])/;
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

        const authData = {
            username: username,
            email: email,
            password: password,
        };

        try {
            const resData = await handleRequest(
                `${process.env.REACT_APP_API_URL}auth/Register`,
                "POST",
                "Something went wrong, please try again later.",
                null,
                authData
            );
            const token = resData.token;
            const userId = resData.id;

            localStorage.setItem("token", token);
            localStorage.setItem("userId", userId);
            const expiration = new Date();
            expiration.setHours(expiration.getHours() + 1);
            localStorage.setItem("expiration", expiration.toISOString());

            return navigate("/fiber-friend/account");
        } catch (error) {
            dispatch(setError(error));
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