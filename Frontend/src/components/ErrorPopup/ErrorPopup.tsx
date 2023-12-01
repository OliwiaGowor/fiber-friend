import React, { useEffect } from 'react';
import classes from './ErrorPopup.module.scss';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import SnackbarContent from '@mui/material/SnackbarContent';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { clearError, errorSelector, setError } from '../../reducers/errorSlice';
import { use } from 'i18next';

const ErrorPopup = () => {
    const error = useAppSelector(errorSelector);
    const dispatch = useAppDispatch();
    const [open, setOpen] = React.useState(error.customMessage ? true : false);

    useEffect(() => {
        setOpen(error.customMessage ? true : false);
    }, [error]);

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        dispatch(clearError());
    };

    const message = () => (
        <div className={classes.message}>
            <p className={classes.text}>{error?.customMessage}</p>
            <p className={classes.info}>{error?.code + ": " + error?.message}</p>
        </div>
    );


    return (
        <div className={classes.errorPopup}>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                open={open}
                message={error?.message}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <SnackbarContent className={classes.snackbarContent}
                    message={message()}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            onClick={handleClose}
                            tabIndex={0} // Make the button focusable
                            role="button"
                        >
                            <CloseIcon />
                        </IconButton>
                    }
                />
            </Snackbar>
        </div>
    );
};

export default ErrorPopup;
