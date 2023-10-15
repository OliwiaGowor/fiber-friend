import TextField from "@mui/material/TextField";
import { Form, json, useNavigate, useNavigation } from "react-router-dom";
import classes from "./RecoverPassPage.module.scss";
import React, { useState } from "react";
import Button from "@mui/material/Button";

export default function RecoverPassPage() {
    const navigation = useNavigation();
    const navigate = useNavigate();
    const isSubmitting = navigation.state === 'submitting';
    const [showEmailError, setShowEmailError] = useState<boolean>(false);
    const [proceedSubmit, setProceedSubmit] = useState<boolean>(true);
    const emailRef = React.useRef<HTMLInputElement | null>(null);

    //Handle form submit - request
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (proceedSubmit) {
            let url = 'https://fiber-frined-default-rtdb.europe-west1.firebasedatabase.app/projects.json';

            const response = await fetch(url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(emailRef.current?.value),
            });

            if (response.status === 422) {
                return response;
            }

            if (!response.ok) {
                throw json({ message: 'Could not send request.' }, { status: 500 });
            }
            const data = await response.json();
            return navigate('/fiber-friend/');
        } else {
            return;
        }
    };

    //Form validation
    const validateForm = () => {
        if (!emailRef.current?.value) {
            setShowEmailError(true);
            setProceedSubmit(false);
        }
    };

    return (
        <div className={classes.container}>
            <Form className={classes.form}>
                <h1>Forgot your password?</h1>
                <p className={classes.text}>Please enter your e-mail address. You will recieve message with a link to reset your password.</p>
                <div className={classes.resetFormContainer}>
                    <div className={classes.formSection}>
                        <TextField
                            id="email"
                            inputProps={{
                                'aria-label': 'email',
                            }}
                            label="Your e-mail"
                            className={classes.formInput}
                            name='email'
                            inputRef={emailRef}
                            error={showEmailError}
                            helperText={showEmailError ? 'Enter email!' : ''}
                            onChange={() => { setShowEmailError(false) }}
                        />
                    </div>
                </div>
                <div className={classes.btnContainer}>
                    <Button variant="contained" className={classes.btnSubmit} disabled={isSubmitting} onClick={validateForm}>
                        {isSubmitting ? "Submitting..." : "Reset password"}
                    </Button>
                </div>
            </Form>
        </div>
    );
}