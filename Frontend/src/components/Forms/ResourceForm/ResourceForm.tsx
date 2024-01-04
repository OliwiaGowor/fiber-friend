import React from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import { FileInput } from '../../FileInput/FileInput';
import TextEditor from "../../TextEditor/TextEditor";
import classes from './ResourceForm.module.scss';
import { tokenLoader } from "../../../utils/auth";
import { useAppDispatch } from '../../../utils/hooks';
import { handleRequest } from "../../../utils/handleRequestHelper";
import { setError } from "../../../reducers/errorSlice";
import { useTranslation } from 'react-i18next';  // Import useTranslation

import { ResourceType } from "../../../DTOs/Enums";

interface ResourceFormProps {
    resource?: any;
    method: string;
}

const ResourceForm = ({ resource, method }: ResourceFormProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation("ResourceForm");
    const [type, setType] = React.useState(resource?.type ?? ResourceType.yarn);
    const [name, setName] = React.useState(resource?.name ?? '');
    const [showNameError, setShowNameError] = React.useState<boolean>(false);
    const [showQuantityError, setShowQuantityError] = React.useState<boolean>(false);
    const [proceedSubmit, setProceedSubmit] = React.useState<boolean>(true);
    const [requiredError, setRequiredError] = React.useState<any>(false);
    const [images, setImages] = React.useState<any | null>(null);
    const [notes, setNotes] = React.useState<any>(resource?.notes ?? null);
    const [toolSize, setToolSize] = React.useState(resource?.toolSize ?? '');
    const [gauge, setGauge] = React.useState(resource?.gauge ?? '');
    const [skeinWeight, setSkeinWeight] = React.useState(resource?.skeinWeight ?? '');
    const [quantity, setQuantity] = React.useState(resource?.quantity ?? '');
    const [skeinLength, setSkeinLength] = React.useState(resource?.skeinLength ?? '');
    const [toolType, setToolType] = React.useState(resource?.toolType ?? '');

    const handleType = (event: React.MouseEvent<HTMLElement>, newType: string | null,) => {
        if (newType !== null) {
            setType(newType);
        }
    };

    //Handle form submit - request
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let resourceData;
        if (type === ResourceType.yarn) {
            resourceData = {
                name: name,
                type: type,
                quantity: quantity,
                toolSize: toolSize,
                gauge: gauge,
                skeinWeight: skeinWeight,
                skeinLenght: skeinLength,
                notes: notes,
                userId: localStorage.getItem('userId'),
            };
        } else if (type === ResourceType.tool) {
            resourceData = {
                name: name,
                type: type,
                quantity: quantity,
                toolSize: toolSize,
                toolType: toolType,
                notes: notes,
                userId: localStorage.getItem('userId'),
            };
        } else {
            resourceData = {
                name: name,
                type: type,
                quantity: quantity,
                notes: notes,
                userId: localStorage.getItem('userId'),
            };
        }

        if(method === "PUT") {
            resourceData = { ...resourceData, id: resource.id };
        }

        let url = method === "POST" ?
            `${process.env.REACT_APP_API_URL}Resource${process.env.REACT_APP_ENV === "dev" ? "" : ".json"}` :
            `${process.env.REACT_APP_API_URL}Resource/${resource.id}${process.env.REACT_APP_ENV === "dev" ? "" : ".json"}`;

        try {
            await handleRequest(
                url,
                method,
                t('couldNotSaveResource'),  // Use translated string
                tokenLoader(),
                resourceData,
            );
            return navigate('/fiber-friend/account/resources');
        } catch (error) {
            dispatch(setError(error));
            return;
        }
    };

    //Form validation
    const validateForm = () => {
        if (!name) {
            setShowNameError(true);
            setProceedSubmit(false);
        }

        if (!quantity) {
            setShowQuantityError(true);
            setProceedSubmit(false);
        }
    };

    const renderFormElements = () => {
        if (type === ResourceType.yarn) {
            return (
                <>
                    <div className={classes.additionalInfo}>
                        <TextField
                            aria-describedby="tool-helper-text"
                            inputProps={{
                                'aria-label': 'tool',
                            }}
                            label={t('toolSize')}  // Use translated string
                            className={classes.formInput}
                            name='tool'
                            required
                            value={toolSize}
                            onChange={(e) => { setToolSize(e.target.value) }}
                        />

                        <TextField
                            aria-describedby="gauge-helper-text"
                            inputProps={{
                                'aria-label': 'gauge',
                            }}
                            label={t('gauge')}  // Use translated string
                            className={classes.formInput}
                            name='gauge'
                            required
                            value={gauge}
                            onChange={(e) => { setGauge(e.target.value) }}
                        />
                    </div>

                    <FormHelperText>{t('gaugeInfo')}</FormHelperText>

                    <div className={classes.additionalInfo}>
                        <TextField
                            aria-describedby="weight-helper-text"
                            inputProps={{
                                'aria-label': 'weight',
                            }}
                            label={t('skeinWeight')}  // Use translated string
                            className={classes.formInput}
                            name='weight'
                            required
                            value={skeinWeight}
                            onChange={(e) => { setSkeinWeight(e.target.value) }}
                        />

                        <TextField
                            aria-describedby="meters-helper-text"
                            inputProps={{
                                'aria-label': 'meters',
                            }}
                            label={t('skeinLength')}  // Use translated string
                            className={classes.formInput}
                            name='meters'
                            required
                            value={skeinLength}
                            onChange={(e) => { setSkeinLength(e.target.value) }}
                        />
                    </div>
                </>
            );
        } else if (type === ResourceType.tool) {
            return (
                <>
                    <div className={classes.additionalInfo}>
                        <TextField
                            aria-describedby="size-helper-text"
                            inputProps={{
                                'aria-label': 'size',
                            }}
                            label={t('size')}  // Use translated string
                            className={classes.formInput}
                            name='size'
                            required
                            value={toolSize}
                            onChange={(e) => { setToolSize(e.target.value) }}
                        />

                        <TextField
                            aria-describedby="tool-type-helper-text"
                            inputProps={{
                                'aria-label': 'tool-type',
                            }}
                            label={t('toolType')}  // Use translated string
                            className={classes.formInput}
                            name='toolType'
                            required
                            value={toolType}
                            onChange={(e) => { setToolType(e.target.value) }}
                        />
                    </div>
                </>
            );
        }
    };

    return (
        <div className={classes.container}>
            <h1 className={classes.header}>{`${method === "POST" ? t('createResource') : t('editResource')}`}</h1>
            <form onSubmit={handleSubmit} className={classes.form} >
                <div className={classes.formContent}>
                    <div className={classes.sectionContainer}>
                        <h2 className={classes.sectionHeader}>{t('details')}</h2>
                        <TextField
                            id="name"
                            inputProps={{
                                'aria-label': 'name',
                            }}
                            label={t('resourceName')}  // Use translated string
                            className={classes.formInput}
                            name='name'
                            error={showNameError}
                            helperText={showNameError ? t('enterResourceName') : ''}
                            onChange={(e) => { setShowNameError(false); setName(e.target.value) }}
                            value={name}
                        />
                        <div className={classes.typeToggleContainer}>
                            <ToggleButtonGroup
                                exclusive
                                onChange={handleType}
                                aria-label="text alignment"
                                id="types"
                                className={classes.typeToggle}
                                value={type}
                            >
                                <ToggleButton value={ResourceType.yarn} className={classes.toggleButton} aria-label="yarn" disableRipple
                                    sx={{
                                        backgroundColor: "var(--background-color)",
                                        '&.Mui-selected, &.Mui-selected:hover': {
                                            backgroundColor: "var(--main-color-medium)",
                                        }
                                    }}>
                                    {t('yarn')}
                                </ToggleButton>
                                <ToggleButton value={ResourceType.tool} className={classes.toggleButton} aria-label="tool" disableRipple
                                    sx={{
                                        backgroundColor: "var(--background-color)",
                                        '&.Mui-selected, &.Mui-selected:hover': {
                                            backgroundColor: "var(--main-color-medium)",
                                        }
                                    }}>
                                    {t('tool')}
                                </ToggleButton>
                                <ToggleButton value={ResourceType.other} className={classes.toggleButton} aria-label="other" disableRipple
                                    sx={{
                                        backgroundColor: "var(--background-color)",
                                        '&.Mui-selected, &.Mui-selected:hover': {
                                            backgroundColor: "var(--main-color-medium)",
                                        }
                                    }}>
                                    {t('other')}
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                        {renderFormElements()}
                        <TextField
                            id="quantity"
                            inputProps={{
                                'aria-label': 'quantity',
                            }}
                            label={t('quantity')}  // Use translated string
                            className={classes.formInput}
                            name='quantity'
                            type="number"
                            error={showQuantityError}
                            helperText={showNameError ? t('enterResourceQuantity') : ''}
                            onChange={(e) => { setShowQuantityError(false); setQuantity(e.target.value) }}
                            value={quantity}
                        />
                    </div>

                    <div className={classes.sectionContainer}>
                        <h2 className={classes.sectionHeader}>{t('photos')}</h2>
                        <p className={classes.additionalText}>{t('addPhoto')}</p>
                        <div className={classes.photoInput}>
                            <FileInput
                                onlyImg={true}
                                addHeader={t('addPhoto')}
                                maxFiles={1}
                                selectedFiles={(images: any) => { setImages(images) }}
                                defaultValue={images}
                            />
                        </div>
                    </div>

                    <div className={classes.sectionContainer}>
                        <h2 className={classes.sectionHeader}>{t('notes')}</h2>
                        <div className={classes.notesField}>
                            <TextEditor
                                getValue={(notes: any) => { setNotes(notes) }}
                                defaultValue={notes}
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
                    {`${method === "POST" ? t('addNewResource') : t('editResource')}`}
                </Button>
            </form>
        </div>
    );
}

export default ResourceForm;
