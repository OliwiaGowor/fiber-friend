import TextField from "@mui/material/TextField";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import React, { useCallback, useEffect } from "react";
import classes from './NewPatternPage.module.scss';
import Button from "@mui/material/Button";
import CategoriesMenu from "../../components/CategoriesMenu";
import { json, useNavigate } from "react-router-dom";
import { FileInput } from '../../components/FileInput';
import BasicTabsForm from "../../components/TabsPanelForm";
import { SelectChangeEvent, InputLabel, Select, MenuItem } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import TextEditor from "../../components/TextEditor/TextEditor";

export default function NewPatternPage() {
    const navigate = useNavigate();
    const [type, setType] = React.useState('crochet');
    const [yarnsInfo, setYarnsInfo] = React.useState<any>([]);
    const nameRef = React.useRef<HTMLInputElement | null>(null);
    const [category, setCategory] = React.useState<string | null>();
    const [showYarnsError, setShowYarnsError] = React.useState<boolean>(false);
    const [showCategoriesError, setShowCategoriesError] = React.useState<boolean>(false);
    const [showNameError, setShowNameError] = React.useState<boolean>(false);
    const [proceedSubmit, setProceedSubmit] = React.useState<boolean>(true);
    const [dateError, setDateError] = React.useState<any>(null);
    const [startDate, setStartDate] = React.useState<any>();
    const [endDate, setEndDate] = React.useState<any>();
    const [requiredError, setRequiredError] = React.useState<any>(false);
    const [selectedImages, setSelectedImages] = React.useState<any | null>(null);
    const [selectedFiles, setSelectedFiles] = React.useState<any | null>(null);
    const [notes, setNotes] = React.useState<any>([]);
   
    const handleType = (event: React.MouseEvent<HTMLElement>, newType: string | null,) => {
        if (newType !== null) {
            setType(newType);
        }
    };

    let dateErrorMessage = requiredError ? 'Enter start date!' : undefined;

    //Handle form submit - request
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (proceedSubmit) {
            const patternData = {
                name: nameRef.current?.value,
                type: type,
                category: category,
                yarns: yarnsInfo,
                photos: selectedImages,
                patterns: selectedFiles,
                notes: notes,
            };
            let url = 'https://fiber-frined-default-rtdb.europe-west1.firebasedatabase.app/patterns.json';

            const response = await fetch(url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(patternData),
            });

            if (response.status === 422) {
                return response;
            }

            if (!response.ok) {
                throw json({ message: 'Could not save pattern.' }, { status: 500 });
            }
            const data = await response.json();
            return navigate('/fiber-friend/account/patterns');
        } else {
            return;
        }
    };

    //Form validation
    const validateForm = () => {
        if (yarnsInfo.length <= 0) {
            setShowYarnsError(true);
            setProceedSubmit(false);
        }
        if (!nameRef.current?.value) {
            setShowNameError(true);
            setProceedSubmit(false);
        }
        if (category === undefined) {
            setShowCategoriesError(true);
            setProceedSubmit(false);
        }
        if (startDate === undefined) {
            setRequiredError(true);
            setProceedSubmit(false);
        }
    };

    return (
        <div className={classes.container}>
            <h1 className={classes.header}>Create new pattern</h1>
            <form onSubmit={handleSubmit} className={classes.form} >
                <div className={classes.formContent}>
                    <div className={classes.sectionContainer}>
                        <h2 className={classes.sectionHeader}>Details</h2>
                        <TextField
                            id="name"
                            inputProps={{
                                'aria-label': 'name',
                            }}
                            label="Pattern name"
                            className={classes.formInput}
                            name='name'
                            inputRef={nameRef}
                            error={showNameError}
                            helperText={showNameError ? 'Enter pattern name!' : ''}
                            onChange={() => { setShowNameError(false) }}
                        />
                        <div className={classes.typeToggleContainer}>
                            <ToggleButtonGroup
                                value={type}
                                exclusive
                                onChange={handleType}
                                aria-label="text alignment"
                                id="types"
                                className={classes.typeToggle}
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
                            <CategoriesMenu showError={showCategoriesError} choseCategory={(categ: string) => { setCategory(categ) }} />
                        </div>
                        <div className={classes.datePickers}>
                            <DatePicker
                                className={classes.dateInput}
                                label="Start date *"
                                onChange={(newValue: any) => { setStartDate(newValue) }}
                                onError={(newError) => {
                                    setDateError(newError);
                                    setRequiredError(false)
                                }}
                                slotProps={{
                                    textField: {
                                        helperText: dateErrorMessage,
                                    },
                                }}
                            />
                            <DatePicker
                                className={classes.dateInput}
                                label="End date"
                                format="DD-MM-YYYY"
                                minDate={startDate}
                                onChange={(newValue: any) => { setEndDate(newValue) }}
                            />
                        </div>
                    </div>

                    <div className={classes.sectionContainer}>
                        <h2 className={classes.sectionHeader}>Photos</h2>
                        <p className={classes.additionalText}>Add up to 10 photos of your work!</p>
                        <div className={classes.photoInput}>
                            <FileInput
                                onlyImg={true}
                                addHeader={'Add photo'}
                                maxFiles={10}
                                selectedFiles={(images: any) => { setSelectedImages(images) }}
                            />
                        </div>
                    </div>

                    <div className={`${classes.sectionContainer} ${classes.formInput}`}>
                        <h2 className={classes.sectionHeader}>Yarns and tools</h2>
                        <p className={classes.additionalText}>Add yarns to see more options</p>
                        <BasicTabsForm showError={showYarnsError} getInfo={(yarnsInfo: any) => { setYarnsInfo(yarnsInfo) }} />
                    </div>

                    <div className={classes.sectionContainer}>
                        <h2 className={classes.sectionHeader}>Files and notes</h2>
                        <p className={classes.additionalText}>Add up to 5 files with patterns.</p>
                        <div className={classes.photoInput}>
                            <FileInput
                                onlyImg={false}
                                addHeader={'Add patterns'}
                                maxFiles={5}
                                selectedFiles={(patterns: any) => { setSelectedFiles(patterns) }}
                            />
                        </div>
                        <div className={classes.notesField}>
                            <TextEditor getValue={(notes: any) => {setNotes(notes)}}/>
                        </div>
                    </div>
                </div>
                <Button className={classes.submitBtn} variant="contained" type="submit" onClick={validateForm}>Add new pattern</Button>
            </form>
        </div>
    );
}
