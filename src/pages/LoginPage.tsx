import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Form, Link, useNavigation } from "react-router-dom";
import classes from "./LoginPage.module.scss";

export default function LoginPage() {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';

    return (
        <div className={classes.container}>
            <div className={classes.sidePanel}>
                <h1>Welcome back!</h1>

                <div>Don't have an account?</div>
               <Link to='/signUp'><Button>Sign up</Button></Link>
            </div>
        <div className={classes.loginForm}>
            <Form >
                <h1>Zaloguj się</h1>
                <div className={classes.loginFormContainer}>
                    <label htmlFor="userName">Nazwa użytkownika</label>
                    <OutlinedInput
                                id="username"
                                inputProps={{
                                    'aria-label': 'username',
                                }}
                                placeholder="Your username"
                                size="small"
                                required
                            />
                    <label htmlFor="password">Hasło</label>
                    <OutlinedInput
                                id="password"
                                inputProps={{
                                    'aria-label': 'password',
                                }}
                                placeholder="Your password"
                                size="small"
                                required
                                type="password"
                            />
                </div>
                <div className={classes.btnContainer}>
                    <Button variant="contained" className={classes.btnSubmit} disabled={isSubmitting}>
                        {isSubmitting ? "Logowanie..." : "Zaloguj się"}
                    </Button>
                </div>
            </Form>
        </div>
        </div>
    );
}
