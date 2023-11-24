import TextField from "@mui/material/TextField";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import React from "react";
import classes from './NewPatternPage.module.scss';
import Button from "@mui/material/Button";
import CategoriesMenu from "../../components/CategoriesMenu/CategoriesMenu";
import { json, useNavigate } from "react-router-dom";
import { FileInput } from '../../components/FileInput/FileInput';
import BasicTabsForm from "../../components/TabsPanelForm/TabsPanelForm";
import TextEditor from "../../components/TextEditor/TextEditor";
import { tokenLoader } from "../../utils/auth";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Pattern } from "../../DTOs/Pattern";
import { NeedleworkType } from "../../DTOs/Enums";

export default function NewPatternPage() {
    const navigate = useNavigate();
    const [type, setType] = React.useState<NeedleworkType>(NeedleworkType.crochet);
    const [yarnsInfo, setYarnsInfo] = React.useState<any>([]);
    const nameRef = React.useRef<HTMLInputElement | null>(null);
    const [category, setCategory] = React.useState<string>("");
    const [showYarnsError, setShowYarnsError] = React.useState<boolean>(false);
    const [showCategoriesError, setShowCategoriesError] = React.useState<boolean>(false);
    const [showNameError, setShowNameError] = React.useState<boolean>(false);
    const [proceedSubmit, setProceedSubmit] = React.useState<boolean>(true);
    const [isAuthorial, setIsAuthorial] = React.useState<boolean>(false);
    const [requiredError, setRequiredError] = React.useState<any>(false);
    const [selectedImages, setSelectedImages] = React.useState<any | null>(null);
    const [selectedFiles, setSelectedFiles] = React.useState<any | null>(null);
    const [notes, setNotes] = React.useState<any>([]);

    const handleType = (event: React.MouseEvent<HTMLElement>, newType: NeedleworkType,) => {
        if (newType !== null) {
            setType(newType);
        }
    };

    let dateErrorMessage = requiredError ? 'Enter start date!' : undefined;

    //Handle form submit - request
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (proceedSubmit) {
            const patternData: Pattern = {
                name: nameRef.current?.value ?? "",
                type: type,
                category: category,
                isAuthorial: isAuthorial,
                yarns: yarnsInfo,
                //photos: selectedImages,
                //patterns: selectedFiles,
                notes: notes,
                userId: localStorage.getItem('userId') ?? "",
            };
            let url = `${process.env.REACT_APP_API_URL}Pattern${process.env.REACT_APP_ENV === "dev" ? "" : ".json"}`;

            const response = await fetch(url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + tokenLoader(),
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
    };

    return (
        <div className={classes.container}>
            <h1 className={classes.header}>Create new pattern</h1>
            <form
                onSubmit={handleSubmit}
                className={classes.form}
                aria-labelledby="create-pattern-form"
            >
                <div className={classes.formContent}>
                    <div className={classes.sectionContainer}>
                        <h2 className={classes.sectionHeader}>Details</h2>
                        <TextField
                            id="name"
                            inputProps={{
                                'aria-label': 'Pattern name',
                                'aria-required': true,
                                'aria-invalid': showNameError,
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
                                <ToggleButton value={NeedleworkType.crochet} className={classes.toggleButton} aria-label="crochet" disableRipple
                                    sx={{
                                        backgroundColor: "var(--background-color)",
                                        '&.Mui-selected, &.Mui-selected:hover': {
                                            backgroundColor: "var(--main-color-medium)",
                                        }
                                    }}>
                                    Crochet
                                </ToggleButton>
                                <ToggleButton value={NeedleworkType.knitting} className={classes.toggleButton} aria-label="knitting" disableRipple
                                    sx={{
                                        backgroundColor: "var(--background-color)",
                                        '&.Mui-selected, &.Mui-selected:hover': {
                                            backgroundColor: "var(--main-color-medium)",
                                        }
                                    }}>
                                    Knitting
                                </ToggleButton>
                                <ToggleButton value={NeedleworkType.other} className={classes.toggleButton} aria-label="other" disableRipple
                                    sx={{
                                        backgroundColor: "var(--background-color)",
                                        '&.Mui-selected, &.Mui-selected:hover': {
                                            backgroundColor: "var(--main-color-medium)",
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
                            <FormControlLabel
                                control={
                                    <Switch 
                                    className={classes.authorialSwitch} 
                                    checked={isAuthorial}
                                    onChange={() => { setIsAuthorial(!isAuthorial) }}
                                    />
                                }
                                label="This is my pattern!" />
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
                            <TextEditor getValue={(notes: any) => { setNotes(notes) }} />
                        </div>
                    </div>
                </div>
                <Button
                    className={classes.submitBtn}
                    variant="contained"
                    type="submit"
                    onClick={validateForm}
                    aria-label="Add new pattern"
                >
                    Add new pattern
                </Button>
            </form>
        </div>
    );
}
