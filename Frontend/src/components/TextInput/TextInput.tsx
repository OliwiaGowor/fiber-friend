import React from 'react';
import TextField from '@mui/material/TextField';
import classes from './TextInput.module.scss';

interface TextInputProps {
    id: string;
    label: string;
    errorText: string;
}

const TextInput = ({ id, label, errorText }: TextInputProps) => {
    const [showError, setShowError] = React.useState(false);

    const validateInput = () => {

    };

    return (
        <TextField
        id={id}
        inputProps={{
            'aria-label': id,
        }}
        label={label}
        className={classes.formInput}
        name={id}
        error={showError}
        helperText={showError ? errorText : ''}
        onChange={() => { setShowError(false) }}
    />
    );
};

export default TextInput;
