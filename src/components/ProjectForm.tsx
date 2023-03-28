import TextField from "@mui/material/TextField";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import React from "react";
import classes from './ProjectForm.module.scss';
import Button from "@mui/material/Button";
import CategoriesMenu from "./CategoriesMenu";
import { json, useNavigate } from "react-router-dom";
import { FileInput } from "./PhotoInput";
import BasicTabsForm from "./TabsPanelForm";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import CloseIcon from '@mui/icons-material/Close';
import Box from "@mui/material/Box";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FormHelperText from "@mui/material/FormHelperText";

export default function ProjectForm() {
    const navigate = useNavigate();
    const [type, setType] = React.useState('crochet');
    const [yarnsInfo, setYarnsInfo] = React.useState<any>([]);
    const nameRef = React.useRef<HTMLInputElement | null>(null);
    const [category, setCategory] = React.useState<any>();
    const [showYarnsError, setShowYarnsError] = React.useState<boolean>(false);
    const [showCategoriesError, setShowCategoriesError] = React.useState<boolean>(false);
    const [showNameError, setShowNameError] = React.useState<boolean>(false);
    const [proceedSubmit, setProceedSubmit] = React.useState<boolean>(true);

    const handleType = (event: React.MouseEvent<HTMLElement>, newType: string | null,) => {
        if (newType !== null) {
            setType(newType);
        }
    };

    //Handle form submit - data validation and request
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const method = 'post';

        //Validation
        if (yarnsInfo.length <= 0) {
            console.log('jest1');
            setShowYarnsError(true);
            setProceedSubmit(false);
        }
        if (!nameRef.current?.value) {
            console.log('jest2');
            setShowNameError(true);
            setProceedSubmit(false);
        }
        if (category === undefined) {
            console.log('jest3');
            setShowCategoriesError(true);
            setProceedSubmit(false);
        }
        console.log(proceedSubmit + 'fdf');
        if (proceedSubmit) {
            const projectData = {
                id: Math.floor(Math.random()) * 10000,
                name: nameRef.current?.value,
                type: type,
                category: category,
                //photos: selectedImages,
            };
            let url = 'https://fiber-frined-default-rtdb.europe-west1.firebasedatabase.app/projects.json';

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(projectData),
            });

            if (response.status === 422) {
                return response;
            }

            if (!response.ok) {
                throw json({ message: 'Could not save project.' }, { status: 500 });
            }
            const data = await response.json();
            return navigate('/account/projects');
        } else {
            return;
        }
    };

    return (
        <div className={classes.container}>
            <h1 className={classes.header}>Create new project</h1>
            <form onSubmit={handleSubmit} className={classes.form} >
                <div className={classes.formContent}>
                    <div className={classes.sectionContainer}>
                        <h2 className={classes.sectionHeader}>Details</h2>
                        <TextField
                            id="name"
                            inputProps={{
                                'aria-label': 'name',
                            }}
                            label="Project name"
                            className={classes.formInput}
                            name='name'
                            inputRef={nameRef}
                            error={showNameError}
                            helperText={showNameError ? 'Enter project name!' : ''}
                            onChange={() => { setShowNameError(false) }}
                        />
                        <div className={classes.typeToggle}>
                            <ToggleButtonGroup
                                value={type}
                                exclusive
                                onChange={handleType}
                                aria-label="text alignment"
                                id="types"
                            >
                                <ToggleButton value="crochet" className={classes.toggleButton} aria-label="crochet" disableRipple
                                    sx={{
                                        backgroundColor: "var(--background-color)",
                                        '&.Mui-selected, &.Mui-selected:hover': {
                                            backgroundColor: "var(--main-color-light)",
                                        }
                                    }}>
                                    Crochet
                                </ToggleButton>
                                <ToggleButton value="knitting" className={classes.toggleButton} aria-label="knitting" disableRipple
                                    sx={{
                                        backgroundColor: "var(--background-color)",
                                        '&.Mui-selected, &.Mui-selected:hover': {
                                            backgroundColor: "var(--main-color-light)",
                                        }
                                    }}>
                                    Knitting
                                </ToggleButton>
                                <ToggleButton value="other" className={classes.toggleButton} aria-label="other" disableRipple
                                    sx={{
                                        backgroundColor: "var(--background-color)",
                                        '&.Mui-selected, &.Mui-selected:hover': {
                                            backgroundColor: "var(--main-color-light)",
                                        }
                                    }}>
                                    Other
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                        <div className={classes.categoriesContainer}>
                            <CategoriesMenu showError={showCategoriesError} chooseCategory={(categ: string) => { setCategory(categ) }} />
                        </div>
                        <div className={classes.datePickers}>
                            <DatePicker label="Start date *" />
                            <DatePicker label="End date" />
                        </div>
                    </div>

                    <div className={classes.sectionContainer}>
                        <h2 className={classes.sectionHeader}>Photos</h2>
                        <p className={classes.additionalText}>Add up to 10 photos of your work!</p>
                        <FileInput />
                    </div>

                    <div className={`${classes.sectionContainer} ${classes.formInput}`}>
                        <h2 className={classes.sectionHeader}>Yarns and tools</h2>
                        <p className={classes.additionalText}>Add yarns to see more options</p>
                        <BasicTabsForm showError={showYarnsError} getInfo={(yarnsInfo: any) => { setYarnsInfo(yarnsInfo) }} />
                    </div>

                    <div className={classes.sectionContainer}>
                        <h2 className={classes.sectionHeader}>Patterns and notes</h2>
                        <p>Pattern</p>

                        <TextField
                            className={`${classes.notesField} ${classes.formInput}`}
                            id="notes"
                            multiline
                            rows={15}
                            label='Write your notes here'
                            sx={{ width: '100%' }}
                        />
                    </div>
                </div>
                <Button className={classes.submitBtn} variant="contained" type="submit">Add new project</Button>
            </form>
        </div>
    );
}
