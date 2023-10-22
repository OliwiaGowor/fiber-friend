import TextField from "@mui/material/TextField";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import React, { useCallback, useEffect } from "react";
import Button from "@mui/material/Button";
import CategoriesMenu from "../../components/CategoriesMenu/CategoriesMenu";
import { json, useNavigate, useRouteLoaderData } from "react-router-dom";
import { FileInput } from '../../components/FileInput/FileInput';
import BasicTabsForm from "../../components/TabsPanelForm/TabsPanelForm";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextEditor from "../../components/TextEditor/TextEditor";
import classes from './NewProjectPage.module.scss';

export default function NewProjectPage() {
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
    const [endDate, setEndDate] = React.useState<any>(null);
    const [requiredError, setRequiredError] = React.useState<any>(false);
    const [selectedImages, setSelectedImages] = React.useState<any | null>(null);
    const [selectedPatternFiles, setSelectedPatternFiles] = React.useState<any | null>(null);
    const [notes, setNotes] = React.useState<any>([]);
    const [patterns, setPatterns] = React.useState<any>([]);
    const [selectedPattern, setSelectedPattern] = React.useState<any | null>(null);

    const fetchAvailablePatterns = useCallback(async () => {
        try {
            const response = await fetch('https://fiber-frined-default-rtdb.europe-west1.firebasedatabase.app/patterns.json');
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const data = await response.json();
            const loadedPatterns = [];

            for (const key in data) {
                loadedPatterns.push({
                    id: key,
                    name: data[key].name,
                });
            }
            setPatterns(loadedPatterns);

        } catch (error) {
            //setError("Something went wrong, try again.");
        }
    }, []);

    useEffect(() => {
        fetchAvailablePatterns();
    }, [fetchAvailablePatterns]);

    const handleType = (event: React.MouseEvent<HTMLElement>, newType: string | null,) => {
        if (newType !== null) {
            setType(newType);
        }
    };

    const handleChange = (event: SelectChangeEvent) => {
        setSelectedPattern(event.target.value as string);
    };

    let dateErrorMessage = requiredError ? 'Enter start date!' : undefined;

    //Handle form submit - request
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (proceedSubmit) {
            const projectData = {
                name: nameRef.current?.value,
                type: type,
                category: category,
                yarns: yarnsInfo,
                startDate: startDate,
                endDate: endDate,
                photos: selectedImages,
                patterns: selectedPatternFiles,
                notes: notes,
                connectedPattern: selectedPattern ? selectedPattern : null,
                finished: endDate !== null ? true : false,
            };
            let url = 'https://fiber-frined-default-rtdb.europe-west1.firebasedatabase.app/projects.json';

            const response = await fetch(url, {
                method: 'post',
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
            return navigate('/fiber-friend/account/projects');
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
                            <br></br>
                            <p className={classes.additionalText}>Add an end date to mark project as finished!</p>
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
                        <h2 className={classes.sectionHeader}>Patterns and notes</h2>
                        <p className={classes.additionalText}>Choose pattern from your library.</p>
                        <InputLabel id="pattern-select">Pattern</InputLabel>
                        <Select
                            labelId="pattern-select"
                            id="pattern-select"
                            value={selectedPattern}
                            label="Pattern"
                            onChange={handleChange}
                            className={classes.patternSelect}
                        >
                            <MenuItem value=''>SELECT PATTERN</MenuItem>
                            {patterns && patterns.map((pattern: any) => (
                                <MenuItem value={pattern.id}>{pattern.name}</MenuItem>
                            ))}
                        </Select>
                        <p className={classes.additionalText}>Add up to 5 files with patterns.</p>
                        <div className={classes.photoInput}>
                            <FileInput
                                onlyImg={false}
                                addHeader={'Add patterns'}
                                maxFiles={5}
                                selectedFiles={(patterns: any) => { setSelectedPatternFiles(patterns) }}
                            />
                        </div>
                        <div className={classes.notesField}>
                            <TextEditor getValue={(notes: any) => {setNotes(notes)}}/>
                        </div>
                    </div>
                </div>
                <Button className={classes.submitBtn} variant="contained" type="submit" onClick={validateForm}>Add new project</Button>
            </form>
        </div>
    );
}


