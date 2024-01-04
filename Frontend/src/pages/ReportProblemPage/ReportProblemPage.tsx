import React from "react";
import { Form } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import classes from "./ReportProblemPage.module.scss";

const ReportProblemPage = () => {
    const { t } = useTranslation("ReportProblemPage");
    const nameRef = React.useRef<HTMLInputElement | null>(null);
    const emailRef = React.useRef<HTMLInputElement | null>(null);
    const topicRef = React.useRef<HTMLInputElement | null>(null);
    const messageRef = React.useRef<HTMLInputElement | null>(null);

    return (
        <div className={classes.container}>
            <Form className={classes.contactForm} >
                <h1 className={classes.header}>{t('reportProblem')}</h1>
                <p className={classes.additionalText}>{t('reportProblemText')}</p>
                <div className={classes.inputs}>
                    <div className={classes.topElements}>
                        <TextField
                            id="name"
                            inputProps={{
                                'aria-label': 'name',
                            }}
                            label={t('yourName')}
                            className={classes.formInput}
                            name='name'
                            inputRef={nameRef}
                            autoComplete="off"
                            required
                        />
                        <TextField
                            id="email"
                            inputProps={{
                                'aria-label': 'email',
                            }}
                            label={t('yourEmail')}
                            className={classes.formInput}
                            name='email'
                            inputRef={emailRef}
                            required
                            autoComplete="email"
                        />
                    </div>
                    <TextField
                        id="topic"
                        inputProps={{
                            'aria-label': 'topic',
                        }}
                        label={t('topic')}
                        className={classes.formInput}
                        name='topic'
                        inputRef={topicRef}
                        autoComplete="off"
                        required
                    />
                    <TextField
                        id="message"
                        inputProps={{
                            'aria-label': 'message',
                        }}
                        label={t('yourMessage')}
                        className={classes.formInput}
                        name='message'
                        inputRef={messageRef}
                        multiline
                        rows={4}
                        maxRows={10}
                        required
                    />
                </div>
                <Button
                    variant="contained"
                    className={classes.button}
                    type="submit"
                >
                    {t('send')}
                </Button>
            </Form>
        </div>
    );
};

export default ReportProblemPage;
