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

export default function EditSupply() {
    const { supply } = useRouteLoaderData('supply-details') as { supply: any };
    const navigate = useNavigate();
    const re = /[0-9]/;
    const [type, setType] = React.useState(supply.type);
    const nameRef = React.useRef<HTMLInputElement | null>(null);
    const [showNameError, setShowNameError] = React.useState<boolean>(false);
    const [proceedSubmit, setProceedSubmit] = React.useState<boolean>(true);
    const [requiredError, setRequiredError] = React.useState<any>(false);
    const [selectedImages, setSelectedImages] = React.useState<any | null>(null);
    const [notes, setNotes] = React.useState<any>([]);
    const toolSizeRef = React.useRef<HTMLInputElement | null>(null);
    const gaugeRef = React.useRef<HTMLInputElement | null>(null);
    const weightRef = React.useRef<HTMLInputElement | null>(null);
    const amountRef = React.useRef<HTMLInputElement | null>(null);
    const metersRef = React.useRef<HTMLInputElement | null>(null);
    const toolTypeRef = React.useRef<HTMLInputElement | null>(null);
    const otherTypeRef = React.useRef<HTMLInputElement | null>(null);

    const handleType = (event: React.MouseEvent<HTMLElement>, newType: string | null,) => {
        if (newType !== null) {
            setType(newType);
        }
    };

    //Handle form submit - request
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (proceedSubmit) {
            let projectData;
            if (type === "yarn") {
                projectData = {
                    name: nameRef.current?.value,
                    type: type,
                    toolSize: toolSizeRef.current?.value,
                    gauge: gaugeRef.current?.value,
                    weight: weightRef.current?.value,
                    meters: metersRef.current?.value,
                    notes: notes,
                };
            } else if (type === 'tool') {
                projectData = {
                    name: nameRef.current?.value,
                    type: type,
                    toolSize: toolSizeRef.current?.value,
                    toolType: toolTypeRef.current?.value,
                    notes: notes,
                };
            } else {
                projectData = {
                    name: nameRef.current?.value,
                    type: type,
                    otherType: otherTypeRef.current?.value,
                    notes: notes,
                };
            }

            let url = 'https://fiber-frined-default-rtdb.europe-west1.firebasedatabase.app/supplies/' + supply.id  + '.json';

            const response = await fetch(url, {
                method: 'PATCH',
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
        if (!nameRef.current?.value) {
            setShowNameError(true);
            setProceedSubmit(false);
        }
    };

    const renderFormElements = () => {
        if (type === 'yarn') {
            return (
                <>
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
                            required
                            defaultValue={supply.tool}
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
                            defaultValue={supply.gauge}
                        />
                    </div>

                    <FormHelperText>Gauge 10cm by 10cm</FormHelperText>

                    <div className={classes.additionalInfo}>
                        <TextField
                            aria-describedby="weight-helper-text"
                            inputProps={{
                                'aria-label': 'weight',
                            }}
                            label="Skein weight"
                            className={classes.formInput}
                            name='weight'
                            inputRef={weightRef}
                            required
                            defaultValue={supply.weight}
                        />

                        <TextField
                            aria-describedby="meters-helper-text"
                            inputProps={{
                                'aria-label': 'meters',
                            }}
                            label="Meters in skein"
                            className={classes.formInput}
                            name='meters'
                            inputRef={metersRef}
                            required
                            defaultValue={supply.meters}
                        />
                    </div>
                </>
            );
        } else if (type === 'tool') {
            return (
                <>
                    <div className={classes.additionalInfo}>
                        <TextField
                            aria-describedby="size-helper-text"
                            inputProps={{
                                'aria-label': 'size',
                            }}
                            label="Size"
                            className={classes.formInput}
                            name='size'
                            inputRef={toolSizeRef}
                            required
                            defaultValue={supply.toolSize}
                        />

                        <TextField
                            aria-describedby="tool-type-helper-text"
                            inputProps={{
                                'aria-label': 'tool-type',
                            }}
                            label="Tool type"
                            className={classes.formInput}
                            name='toolType'
                            inputRef={toolTypeRef}
                            required
                            defaultValue={supply.toolType}
                        />
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <div className={classes.additionalInfo}>
                        <TextField
                            aria-describedby="other-type-helper-text"
                            inputProps={{
                                'aria-label': 'other-type',
                            }}
                            label="Type"
                            className={classes.formInput}
                            name='otherType'
                            inputRef={otherTypeRef}
                            required
                            defaultValue={supply.otherType}
                        />
                    </div>
                </>
            );
        }
    };

    return (
        <div className={classes.container}>
            <h1 className={classes.header}>Edit supply</h1>
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
                            defaultValue={supply.name}
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
                        {renderFormElements()}
                        <TextField
                            id="amount"
                            inputProps={{
                                'aria-label': 'amount',
                            }}
                            label="Amount"
                            className={classes.formInput}
                            name='amount'
                            inputRef={amountRef}
                            //error={showAmountError}
                            helperText={showNameError ? 'Enter supply amount!' : ''}
                            //onChange={() => { setShowNameError(false) }}
                            defaultValue={supply.amount}
                        />
                    </div>

                    <div className={classes.sectionContainer}>
                        <h2 className={classes.sectionHeader}>Photos</h2>
                        <p className={classes.additionalText}>Add a photo!</p>
                        <div className={classes.photoInput}>
                            <FileInput
                                onlyImg={true}
                                addHeader={'Add photo'}
                                maxFiles={1}
                                selectedFiles={(images: any) => { setSelectedImages(images) }}
                                defaultValue={supply.photos}
                            />
                        </div>
                    </div>

                    <div className={classes.sectionContainer}>
                        <h2 className={classes.sectionHeader}>Notes</h2>
                        <div className={classes.notesField}>
                            <TextEditor
                                getValue={(notes: any) => { setNotes(notes) }}
                                defaultValue={supply.notes}
                            />
                        </div>
                    </div>
                </div>
                <Button
                    className={classes.submitBtn}
                    variant="contained"
                    type="submit"
                    onClick={validateForm}
                >
                    Edit project
                </Button>
            </form>
        </div>
    );
}


