import React, { ChangeEvent, useEffect, useState } from 'react';
import classes from './PasswordVaildation.module.scss';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { get } from 'http';

interface PasswordValidationProps {
    getPassword: (password: string) => void;
    showError: boolean;
}

const PasswordValidation = ({ getPassword, showError }: PasswordValidationProps
) => {
    const [password, setPassword] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [showPasswordError, setShowPasswordError] = useState<boolean>(showError);
    const [showPassword, setShowPassword] = useState(false);
    const checklistRef = React.useRef<HTMLUListElement | null>(null);
    const passwordChecklist = checklistRef.current?.children || [];

    const validationRegex = [
        { regex: /.{8,}/ }, // min 8 letters,
        { regex: /[0-9]/ }, // numbers from 0 - 9
        { regex: /[a-z]/ }, // letters from a - z (lowercase)
        { regex: /[A-Z]/ }, // letters from A-Z (uppercase),
        { regex: /[^A-Za-z0-9]/ } // special characters
    ]
    useEffect(() => {
        setShowPasswordError(showError);
    }, [showError]);
    
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        const valid = validatePassword(event.target.value);
        setIsValid(valid);
        if (valid) { getPassword(event.target.value); }
    };

    const validatePassword = (password: string) => {
        const allValid: boolean[] = [];
        validationRegex.forEach((item, i) => {

            let isValid = item.regex.test(password);

            if (isValid) {
                passwordChecklist[i].classList.add(`${classes.correct}`);
                passwordChecklist[i].classList.remove(`${classes.invalid}`);
                allValid.push(true);
            } else {
                passwordChecklist[i].classList.add(`${classes.invalid}`);
                passwordChecklist[i].classList.remove(`${classes.correct}`);
                allValid.push(false);
            }
        })

        return allValid.every((item) => {
            return item === true;
        });
    };

    return (
        <div className={classes.passwordValidationContainer}>
            <TextField
                id="password"
                inputProps={{
                    'aria-label': 'password',
                }}
                label="Password"
                className={classes.formInput}
                name='password'
                error={showPasswordError}
                helperText={showPasswordError ? 'Enter valid password!' : ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setShowPasswordError(false);
                    handlePasswordChange(e);
                }}
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                    endAdornment:
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                }}
            />
            <ul className={classes.checklist} ref={checklistRef}>
                <li className={`${classes.checklistItem}`}>Min. 8 characters</li>
                <li className={`${classes.checklistItem}`}>number</li>
                <li className={`${classes.checklistItem}`}>lowercase letter</li>
                <li className={`${classes.checklistItem}`}>uppercase letter</li>
                <li className={`${classes.checklistItem}`}>special character</li>
            </ul>
        </div>
    );
}

export default PasswordValidation;
