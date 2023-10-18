import { Form } from "react-router-dom";
import classes from "./ReportProblemPage.module.scss";
import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const ReportProblemPage = () => {
    const nameRef = React.useRef<HTMLInputElement | null>(null);
    const emailRef = React.useRef<HTMLInputElement | null>(null);
    const topicRef = React.useRef<HTMLInputElement | null>(null);
    const messageRef = React.useRef<HTMLInputElement | null>(null);

    return (
        <div className={classes.container}>
            <Form className={classes.contactForm} >
                <h1 className={classes.header}>Report a problem!</h1>
                <p className={classes.additionalText}>If you've experienced any issues we encourage you to contact us and describe it.</p>
                <div className={classes.inputs}>
                    <div className={classes.topElements}>
                        <TextField
                            id="name"
                            inputProps={{
                                'aria-label': 'name',
                            }}
                            label="Your name"
                            className={classes.formInput}
                            name='name'
                            inputRef={nameRef}
                            autoComplete="off"
                        //error={showUsernameError}
                        //helperText={'Enter username!' : ''}
                        //onChange={() => { setShowUsernameError(false) }}
                        />
                        <TextField
                            id="email"
                            inputProps={{
                                'aria-label': 'email',
                            }}
                            label="Your email"
                            className={classes.formInput}
                            name='email'
                            inputRef={emailRef}
                        //error={showUsernameError}
                        //helperText={'Enter username!' : ''}
                        //onChange={() => { setShowUsernameError(false) }}
                        />
                    </div>
                    <TextField
                        id="topic"
                        inputProps={{
                            'aria-label': 'topic',
                        }}
                        label="Topic"
                        className={classes.formInput}
                        name='topic'
                        inputRef={topicRef}
                        autoComplete="off"
                    //error={showUsernameError}
                    //helperText={'Enter username!' : ''}
                    //onChange={() => { setShowUsernameError(false) }}
                    />
                    <TextField
                        id="message"
                        inputProps={{
                            'aria-label': 'message',
                        }}
                        label="Your message"
                        className={classes.formInput}
                        name='message'
                        inputRef={messageRef}
                        multiline
                        rows={4}
                        maxRows={10}
                    />
                </div>
                <Button
                    variant="contained"
                    className={classes.button}
                    type="submit"
                >
                    Send!
                </Button>
            </Form>
        </div>
    );
};

export default ReportProblemPage;
