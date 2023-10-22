import React from 'react';
import classes from './ErrorPopup.module.scss';
import { Snackbar } from '@mui/material';

interface ErrorPopupProps {
    message: string;
}

const ErrorPopup = ({ message }: ErrorPopupProps) => {
    return (
        <div className={classes.errorPopup}>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={true}
                message={message}
                autoHideDuration={6000}
            />
        </div>
    );
};

export default ErrorPopup;
