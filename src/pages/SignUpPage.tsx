import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Form, useActionData, useNavigation, Link } from "react-router-dom";
import classes from "./SignUpPage.module.scss"

export default function SignUpPage() {

    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

    return (
        <div className={classes.container}>
            <div className={classes.sidePanel}>
                <h1 className={classes.panelHeader}>Welcome back!</h1>
                <div>Already have an account?</div>
                <Link to='/fiber-friend/login'><Button className={classes.btnSignin}>Sign In</Button></Link>
            </div>
            <div className={classes.signUpForm}>
                <Form >
                    <h1 className={classes.header}>Sign Up</h1>
                    <div className={classes.signUpFormContainer}>
                        <div className={classes.formSection}>
                            <label htmlFor="email">E-mail</label>
                            <OutlinedInput
                                id="email"
                                inputProps={{
                                    'aria-label': 'email',
                                }}
                                placeholder="Your email"
                                size="small"
                                required
                                type="email"
                            />
                        </div>
                        <div className={classes.formSection}>
                            <label htmlFor="username">Username</label>
                            <OutlinedInput
                                id="username"
                                inputProps={{
                                    'aria-label': 'username',
                                }}
                                placeholder="Your username"
                                size="small"
                                required
                            />
                        </div>
                        <div className={classes.formSection}>
                            <label htmlFor="password">Password</label>
                            <OutlinedInput
                                id="password"
                                inputProps={{
                                    'aria-label': 'password',
                                }}
                                placeholder="Your password"
                                size="small"
                                required
                            />
                        </div>
                        <div className={classes.formSection}>
                            <label htmlFor="password">Repeat password</label>
                            <OutlinedInput
                                id="password"
                                inputProps={{
                                    'aria-label': 'password',
                                }}
                                placeholder="Repeat your password"
                                size="small"
                                required
                                type="password"
                            />
                        </div>
                    </div>
                    <div className={classes.btnContainer}>
                        <Button className={classes.btnSubmit} disabled={isSubmitting}>
                            {isSubmitting ? "Rejestrowanie..." : "Zarejestruj się"}
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}