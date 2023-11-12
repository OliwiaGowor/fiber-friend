import React from 'react';
import classes from './ErrorPopup.module.scss';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import SnackbarContent from '@mui/material/SnackbarContent';

const ErrorPopup = () => {
    const message = localStorage.getItem("error");
    const [open, setOpen] = React.useState(message ? true : false);

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        localStorage.removeItem("error");
    };

    return (
        <div className={classes.errorPopup}>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={open}
                message={message}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <SnackbarContent className={classes.snackbarContent}
                    message={message}
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
