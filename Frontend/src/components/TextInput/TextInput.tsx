import React from 'react';
import TextField from '@mui/material/TextField';
import classes from './TextInput.module.scss';

interface TextInputProps {
    id: string;
    label: string;
    inputRef: React.RefObject<HTMLInputElement>;
    errorText: string;
}

const TextInput = ({ id, label, inputRef, errorText }: TextInputProps) => {
    const [showError, setShowError] = React.useState(false);

    const validateInput = () => {
        if (inputRef.current) {
            if (inputRef.current.value === '') {
                setShowError(true);
            } else {
                setShowError(false);
            }
        }
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
        inputRef={inputRef}
        error={showError}
        helperText={showError ? errorText : ''}
        onChange={() => { setShowError(false) }}
    />
    );
};

export default TextInput;
