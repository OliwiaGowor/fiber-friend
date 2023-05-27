import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Form, useActionData, useNavigation, Link } from "react-router-dom";
import classes from "./SignUpPage.module.scss"
import TextField from "@mui/material/TextField";
import React from "react";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

export default function SignUpPage() {

    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";
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
                <p className={classes.panelText}>Already have an account?</p>
                <Link to='/fiber-friend/login'>
                    <Button className={classes.btnSignin}>
                        Sign In
                    </Button>
                </Link>
            </div>

            <div className={classes.signUpForm}>
                <Form className={classes.form}>
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
                                inputRef={usernameRef}
                                error={showUsernameError}
                                helperText={showUsernameError ? 'Enter e-mail!' : ''}
                                onChange={() => { setShowUsernameError(false) }}
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
                        <div className={classes.formSection}>
                            <TextField
                                id="repPassword"
                                inputProps={{
                                    'aria-label': 'repPassword',
                                }}
                                label="Repeat password"
                                className={classes.formInput}
                                name='repPassword'
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
                        <Button className={classes.btnSubmit} disabled={isSubmitting}>
                            {isSubmitting ? "Registering..." : "Register"}
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}