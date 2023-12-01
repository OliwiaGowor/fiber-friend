import TextField from "@mui/material/TextField";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from "react";
import classes from './PatternForm.module.scss';
import Button from "@mui/material/Button";
import CategoriesMenu from "../../CategoriesMenu/CategoriesMenu";
import { useNavigate } from "react-router-dom";
import { FileInput } from '../../FileInput/FileInput';
import BasicTabsForm from "../../TabsPanelForm/TabsPanelForm";
import TextEditor from "../../TextEditor/TextEditor";
import { tokenLoader } from "../../../utils/auth";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Pattern } from "../../../DTOs/Pattern";
import { NeedleworkType } from "../../../DTOs/Enums";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useAppDispatch } from "../../../utils/hooks";
import { setError } from "../../../reducers/errorSlice";
import { handleRequest } from "../../../utils/handleRequestHelper";

interface PatternFormProps {
    pattern?: Pattern;
    method: string;
}

export default function PatternForm({ pattern, method }: PatternFormProps) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [type, setType] = useState<NeedleworkType>(pattern?.type ?? NeedleworkType.crochet);
    const [yarnsInfo, setYarnsInfo] = useState<any>(pattern?.yarns ?? []);
    const [toolsInfo, setToolsInfo] = useState<any>(pattern?.tools ?? []);
    const [otherSuppliesInfo, setOtherSuppliesInfo] = useState<any>(pattern?.otherSupplies ?? []);
    const [name, setName] = useState(pattern?.name ?? "");
    const [category, setCategory] = useState<string>(pattern?.category ?? "");
    const [showYarnsError, setShowYarnsError] = useState<boolean>(false);
    const [showCategoriesError, setShowCategoriesError] = useState<boolean>(false);
    const [showNameError, setShowNameError] = useState<boolean>(false);
    const [proceedSubmit, setProceedSubmit] = useState<boolean>(true);
    const [isAuthorial, setIsAuthorial] = useState<boolean>(pattern?.isAuthorial ?? false);
    const [requiredError, setRequiredError] = useState<any>(false);
    const [selectedImages, setSelectedImages] = useState<any | null>(pattern?.photos ?? "");
    const [selectedFiles, setSelectedFiles] = useState<any | null>(pattern?.files ?? "");
    const [notes, setNotes] = useState<any>(pattern?.notes ?? null);
    const [dateError, setDateError] = useState<any>(null);
    const [startDate, setStartDate] = useState<any>(pattern?.startDate ?? null);
    const [endDate, setEndDate] = useState<any>(pattern?.endDate ?? null);
    let dateErrorMessage = requiredError ? 'Enter start date!' : undefined;

    const handleType = (event: React.MouseEvent<HTMLElement>, newType: NeedleworkType,) => {
        if (newType !== null) {
            setType(newType);
        }
    };

    //Handle form submit - request
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (proceedSubmit) {
            const patternData: Pattern = {
                name: name,
                type: type,
                category: category,
                isAuthorial: isAuthorial,
                yarns: yarnsInfo,
                tools: toolsInfo,
                otherSupplies: otherSuppliesInfo ?? null,
                //photos: selectedImages,
                //patterns: selectedFiles,
                notes: notes,
                authorId: localStorage.getItem('userId') ?? "",
                finished: endDate !== null ? true : false,
                startDate: startDate,
                isShared: false
            };

            let url = (method === "POST") ?
                `${process.env.REACT_APP_API_URL}Pattern${process.env.REACT_APP_ENV === "dev" ? "" : ".json"}` :
                `${process.env.REACT_APP_API_URL}Pattern/${pattern?.id}${process.env.REACT_APP_ENV === "dev" ? "" : ".json"}`;

            try {
                await handleRequest(
                    url,
                    method,
                    "Could not post pattern. Please try again later.",
                    tokenLoader(),
                    patternData
                );
                return navigate('/fiber-friend/account/patterns');

            } catch (error) {
                dispatch(setError(error));
                return;
            }
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
        if (!name) {
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
            <h1 className={classes.header}>{`${method === "POST" ? "Create" : "Edit"} pattern`}</h1>
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
                            value={name}
                            error={showNameError}
                            helperText={showNameError ? 'Enter pattern name!' : ''}
                            onChange={(e) => { setShowNameError(false); setName(e.target.value); }}
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
                        {isAuthorial &&
                            <div className={classes.datePickers}>
                                <DatePicker
                                    className={classes.dateInput}
                                    label="Start date *"
                                    onChange={(newValue: any) => { setStartDate(newValue) }}
                                    format="DD-MM-YYYY"
                                    onError={(newError) => {
                                        setDateError(newError);
                                        setRequiredError(false)
                                    }}
                                    slotProps={{
                                        textField: {
                                            helperText: dateErrorMessage,
                                        },
                                    }}
                                    value={dayjs(startDate)}
                                />
                                <DatePicker
                                    className={classes.dateInput}
                                    label="End date"
                                    format="DD-MM-YYYY"
                                    minDate={startDate ?? undefined}
                                    onChange={(newValue: any) => { setEndDate(newValue) }}
                                    value={dayjs(endDate)}
                                />
                                <br></br>
                                <p className={classes.additionalText}>Add an end date to mark project as finished!</p>
                            </div>
                        }
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
                        <BasicTabsForm
                            showError={showYarnsError}
                            getInfo={(yarnsInfo: any) => { setYarnsInfo(yarnsInfo) }}
                            type="yarn"
                        />
                        <p className={classes.additionalText}>Add tools to see more options</p>
                        <BasicTabsForm
                            showError={showYarnsError}
                            getInfo={(toolsInfo: any) => { setToolsInfo(toolsInfo) }}
                            type="tool"
                        />
                        <p className={classes.additionalText}>Add other supplies to see more options</p>
                        <BasicTabsForm
                            showError={showYarnsError}
                            getInfo={(otherSuppliesInfo: any) => { setOtherSuppliesInfo(otherSuppliesInfo) }}
                            type="other supply"
                        />
                    </div>
                    <div className={classes.sectionContainer}>
                        <h2 className={classes.sectionHeader}>Files and notes</h2>
                        <p className={classes.additionalText}>Add up to 5 files with patterns.</p>
                        <div className={classes.fileInput}>
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
                    aria-label="Submit button"
                >
                    {`${method === "POST" ? "Create" : "Edit"} pattern`}
                </Button>
            </form>
        </div>
    );
}
