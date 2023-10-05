import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Form, Link, useNavigation } from "react-router-dom";
import classes from "./LoginPage.module.scss";
import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function LoginPage() {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';
    const [showUsernameError, setShowUsernameError] = React.useState<boolean>(false);
    const usernameRef = React.useRef<HTMLInputElement | null>(null);
    const [showPasswordError, setShowPasswordError] = React.useState<boolean>(false);
    const passwordRef = React.useRef<HTMLInputElement | null>(null);
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <div className={classes.container}>
            <div className={classes.sidePanel}>
                <h1 className={classes.panelHeader}>Welcome back!</h1>
                <p className={classes.panelText}>Don't have an account?</p>
                <Link to='/fiber-friend/signUp'>
                    <Button className={classes.btnSignup}>
                        Sign up
                    </Button>
                </Link>
            </div>

            <div className={classes.loginForm}>
                <Form className={classes.form}>
                    <h1>Log in</h1>
                    <div className={classes.loginFormContainer}>
                        <div className={classes.formSection}>
                            <TextField
                                id="username"
                                inputProps={{
                                    'aria-label': 'username',
                                }}
                                label="Username"
                                className={classes.formInput}
                                name='username'
                                inputRef={usernameRef}
                                error={showUsernameError}
                                helperText={showUsernameError ? 'Enter username!' : ''}
                                onChange={() => { setShowUsernameError(false) }}
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
                                inputRef={passwordRef}
                                error={showPasswordError}
                                helperText={showPasswordError ? 'Enter password!' : ''}
                                onChange={() => { setShowPasswordError(false) }}
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
                        <Button variant="contained" className={classes.btnSubmit} disabled={isSubmitting}>
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
