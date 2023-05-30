import TextField from "@mui/material/TextField";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import React, { useCallback, useEffect } from "react";
import Button from "@mui/material/Button";
import CategoriesMenu from "../../components/CategoriesMenu";
import { json, useNavigate, useRouteLoaderData } from "react-router-dom";
import { FileInput } from '../../components/FileInput';
import BasicTabsForm from "../../components/TabsPanelForm";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextEditor from "../../components/TextEditor/TextEditor";
import classes from './NewSupplyPage.module.scss';
import FormHelperText from "@mui/material/FormHelperText";

export default function NewSupplyPage() {
    const navigate = useNavigate();
    const [type, setType] = React.useState('yarn');
    const [yarnsInfo, setYarnsInfo] = React.useState<any>([]);
    const nameRef = React.useRef<HTMLInputElement | null>(null);
    const [showYarnsError, setShowYarnsError] = React.useState<boolean>(false);
    const [showNameError, setShowNameError] = React.useState<boolean>(false);
    const [proceedSubmit, setProceedSubmit] = React.useState<boolean>(true);
    const [requiredError, setRequiredError] = React.useState<any>(false);
    const [selectedImages, setSelectedImages] = React.useState<any | null>(null);
    const [notes, setNotes] = React.useState<any>([]);
    const [selectedPattern, setSelectedPattern] = React.useState<any | null>(null);
    const toolSizeRef = React.useRef<HTMLInputElement | null>(null);
    const gaugeRef = React.useRef<HTMLInputElement | null>(null);
    const weightRef = React.useRef<HTMLInputElement | null>(null);
    const amountRef = React.useRef<HTMLInputElement | null>(null);

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
            const projectData = {
                name: nameRef.current?.value,
                type: type,
                yarns: yarnsInfo,
                photos: selectedImages,
                notes: notes,
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
                throw json({ message: 'Could not save supply.' }, { status: 500 });
            }
            const data = await response.json();
            return navigate('/fiber-friend/account/supplies');
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
    };

    return (
        <div className={classes.container}>
            <h1 className={classes.header}>Add new supply</h1>
            <form onSubmit={handleSubmit} className={classes.form} >
                <div className={classes.formContent}>
                    <div className={classes.sectionContainer}>
                        <h2 className={classes.sectionHeader}>Details</h2>
                        <TextField
                            id="name"
                            inputProps={{
                                'aria-label': 'name',
                            }}
                            label="Supply name"
                            className={classes.formInput}
                            name='name'
                            inputRef={nameRef}
                            error={showNameError}
                            helperText={showNameError ? 'Enter supply name!' : ''}
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
                                <ToggleButton value="yarn" className={classes.toggleButton} aria-label="yarn" disableRipple
                                    sx={{
                                        backgroundColor: "var(--background-color)",
                                        '&.Mui-selected, &.Mui-selected:hover': {
                                            backgroundColor: "var(--main-color-light)",
                                        }
                                    }}>
                                    Yarn
                                </ToggleButton>
                                <ToggleButton value="tool" className={classes.toggleButton} aria-label="tool" disableRipple
                                    sx={{
                                        backgroundColor: "var(--background-color)",
                                        '&.Mui-selected, &.Mui-selected:hover': {
                                            backgroundColor: "var(--main-color-light)",
                                        }
                                    }}>
                                    Tool
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
                        <div className={classes.additionalInfo}>
                            <TextField
                                aria-describedby="tool-helper-text"
                                inputProps={{
                                    'aria-label': 'tool',
                                }}
                                label="Tool size"
                                className={classes.formInput}
                                name='tool'
                                inputRef={toolSizeRef}
                            />

                            <TextField
                                aria-describedby="gauge-helper-text"
                                inputProps={{
                                    'aria-label': 'gauge',
                                }}
                                label="Gauge"
                                className={classes.formInput}
                                name='gauge'
                                inputRef={gaugeRef}
                                required
                            />
                        </div>

                        <FormHelperText>Gauge 10cm by 10cm</FormHelperText>

                        <div className={classes.additionalInfo}>
                            <TextField
                                aria-describedby="weight-helper-text"
                                inputProps={{
                                    'aria-label': 'weight',
                                }}
                                label="Weight"
                                className={classes.formInput}
                                name='weight'
                                inputRef={weightRef}
                                required
                            />

                            <TextField
                                aria-describedby="amount-helper-text"
                                inputProps={{
                                    'aria-label': 'amount',
                                }}
                                label="Amount in skein"
                                className={classes.formInput}
                                name='amount'
                                inputRef={amountRef}
                                required
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

                    <div className={classes.sectionContainer}>
                        <h2 className={classes.sectionHeader}>Notes</h2>
                        <div className={classes.notesField}>
                            <TextEditor getValue={(notes: any) => { setNotes(notes) }} />
                        </div>
                    </div>
                </div>
                <Button className={classes.submitBtn} variant="contained" type="submit" onClick={validateForm}>Add new project</Button>
            </form>
        </div>
    );
}


