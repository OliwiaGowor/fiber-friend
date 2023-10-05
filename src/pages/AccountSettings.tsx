import { Form } from 'react-router-dom';
import classes from './AccountSettings.module.scss';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import Button from '@mui/material/Button';

export default function AccountSettings() {

    const usernameRef = React.useRef<HTMLInputElement | null>(null);
    const emailRef = React.useRef<HTMLInputElement | null>(null);
    const passwordRef = React.useRef<HTMLInputElement | null>(null);

    return (
        <div className={classes.container}>
            <Form method={'patch'} className={classes.form}>
                <div className={classes.formContent}>
                    <div className={classes.sectionContainer}>
                        <TextField
                            aria-describedby="username-helper-text"
                            inputProps={{
                                'aria-label': 'username',
                            }}
                            label="Username"
                            className={classes.formInput}
                            name='weight'
                            inputRef={usernameRef}
                            required
                        //defaultValue={user.username}
                        />
                        <TextField
                            aria-describedby="email-helper-text"
                            inputProps={{
                                'aria-label': 'email',
                            }}
                            label="E-mail"
                            className={classes.formInput}
                            name='email'
                            inputRef={emailRef}
                            required
                        //defaultValue={user.email}
                        />
                        <TextField
                            aria-describedby="password-helper-text"
                            inputProps={{
                                'aria-label': 'password',
                            }}
                            label="Password"
                            className={classes.formInput}
                            name='password'
                            inputRef={passwordRef}
                            required
                        //defaultValue={user.password}
                        />
                    </div>
                </div>
                <div className={classes.btnContainer}>
                    <Button className={classes.submitBtn} disableRipple>
                        Submit
                    </Button>
                </div>
            </Form>
        </div>
    );


}