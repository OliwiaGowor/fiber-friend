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
                <h1>Welcome back!</h1>

                <div>Already have an account?</div>
               <Link to='/login'><Button>Sign In</Button></Link>
            </div>
            <div className={classes.signUpForm}>
                <Form >
                    <h1 className={classes.header}>Sign Up</h1>
                    <div className={classes.signUpFormContainer}>
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
                        <label htmlFor="username">Nazwa użytkownika</label>
                        <OutlinedInput
                                id="username"
                                inputProps={{
                                    'aria-label': 'username',
                                }}
                                placeholder="Your username"
                                size="small"
                                required
                            />
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
                    <div className={classes.btnContainer}>
                        <button className={classes.btnSubmit} disabled={isSubmitting}>
                            {isSubmitting ? "Rejestrowanie..." : "Zarejestruj się"}
                        </button>
                    </div>
                    <div className={classes.btnContainer}><Link to={'/login'}>Masz już konto? Kliknij tu i zaloguj się!</Link></div>
                </Form>
            </div>
        </div>
    );
}