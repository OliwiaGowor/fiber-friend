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
import { useTranslation } from "react-i18next";
import { end } from "slate";

interface PatternFormProps {
    pattern?: Pattern;
    method: string;
}

export default function PatternForm({ pattern, method }: PatternFormProps) {
    const { t } = useTranslation('PatternForm');
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
    const [selectedImages, setSelectedImages] = useState<any | null>(pattern?.photos ?? []);
    const [selectedFiles, setSelectedFiles] = useState<any | null>(pattern?.files ?? []);
    const [notes, setNotes] = useState<any>(pattern?.notes ?? null);
    const [dateError, setDateError] = useState<any>(null);
    const [startDate, setStartDate] = useState<any>(pattern?.startDate ?? null);
    const [endDate, setEndDate] = useState<any>(pattern?.endDate ?? null);
    let dateErrorMessage = requiredError ? t('startDate') : undefined;

    const handleType = (event: React.MouseEvent<HTMLElement>, newType: NeedleworkType,) => {
        if (newType !== null) {
            setType(newType);
        }
    };

    //Handle form submit - request
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const patternData: any = {
                name: name,
                type: type,
                category: category,
                isAuthorial: isAuthorial,
                photos: selectedImages,
                files: selectedFiles,
                notes: notes ?? '',
                authorId: localStorage.getItem('userId') ?? "",
                finished: endDate !== null ? true : false,
                startDate: startDate,
                isShared: pattern?.isShared ?? false,
            };

            if (pattern) {
                patternData.id = pattern?.id;
                patternData.yarns = yarnsInfo?.map((yarn: any) => {return {...yarn, patternId: pattern?.id }});
                patternData.tools = toolsInfo?.map((tool: any) => {return {...tool, patternId: pattern?.id }});
                patternData.otherSupplies = otherSuppliesInfo?.map((otherSupply: any) => {return {...otherSupply, patternId: pattern?.id }}) ?? null;
            } else {
                patternData.yarns = [...yarnsInfo];
                patternData.tools = [...toolsInfo];
                patternData.otherSupplies = [...otherSuppliesInfo] ?? null;
            }

            if(endDate !== null) {
                patternData.endDate = endDate;
            }

            let url = (method === "POST") ?
                `${process.env.REACT_APP_API_URL}Pattern${process.env.REACT_APP_ENV === "dev" ? "" : ".json"}` :
                `${process.env.REACT_APP_API_URL}Pattern/${pattern?.id}${process.env.REACT_APP_ENV === "dev" ? "" : ".json"}`;

            await handleRequest(
                url,
                method,
                t("couldNotPostPattern"),
                tokenLoader(),
                patternData
            );

            return navigate('/fiber-friend/account/patterns');
        } catch (error) {
            dispatch(setError(error));
        }
    };

    //Form validation
    const validateForm = () => {
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
            <h1 className={classes.header}>{t(method === 'POST' ? 'createPattern' : 'editPattern')}</h1>
            <form
                onSubmit={handleSubmit}
                className={classes.form}
                aria-labelledby="create-pattern-form"
            >
                <div className={classes.formContent}>
                    <div className={classes.sectionContainer}>
                        <h2 className={classes.sectionHeader}>{t('details')}</h2>
                        <TextField
                            id="name"
                            inputProps={{
                                'aria-label': t('patternName'),
                                'aria-required': true,
                                'aria-invalid': showNameError,
                            }}
                            label={t('patternName')}
                            className={classes.formInput}
                            name='name'
                            value={name}
                            error={showNameError}
                            helperText={showNameError ? t('enterPatternName') : ''}
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
                                    {t('crochet')}
                                </ToggleButton>
                                <ToggleButton value={NeedleworkType.knitting} className={classes.toggleButton} aria-label="knitting" disableRipple
                                    sx={{
                                        backgroundColor: "var(--background-color)",
                                        '&.Mui-selected, &.Mui-selected:hover': {
                                            backgroundColor: "var(--main-color-medium)",
                                        }
                                    }}>
                                    {t('knitting')}
                                </ToggleButton>
                                <ToggleButton value={NeedleworkType.other} className={classes.toggleButton} aria-label="other" disableRipple
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
                                label={t('thisIsMyPattern')}
                            />
                        </div>
                        {isAuthorial &&
                            <div className={classes.datePickers}>
                                <DatePicker
                                    className={classes.dateInput}
                                    label={t('startDate')}
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
                                    label={t('endDate')}
                                    format="DD-MM-YYYY"
                                    onChange={(newValue: any) => { setEndDate(newValue) }}
                                    value={dayjs(endDate)}
                                />
                                <br></br>
                                <p className={classes.additionalText}>{t('addEndDate')}</p>
                            </div>
                        }
                    </div>
                    <div className={classes.sectionContainer}>
                        <h2 className={classes.sectionHeader}>{t('photos')}</h2>
                        <p className={classes.additionalText}>{t('addUpTo10Photos')}</p>
                        <div className={classes.photoInput}>
                            <FileInput
                                onlyImg={true}
                                addHeader={t('addPhoto')}
                                maxFiles={10}
                                defaultValue={selectedImages}
                                selectedFiles={(images: any) => { setSelectedImages(images) }}
                            />
                        </div>
                    </div>
                    <div className={`${classes.sectionContainer} ${classes.formInput}`}>
                        <h2 className={classes.sectionHeader}>{t('yarnsAndTools')}</h2>
                        <p className={classes.additionalText}>{t('addYarnsToSeeMoreOptions')}</p>
                        <BasicTabsForm
                            showError={showYarnsError}
                            getInfo={(yarnsInfo: any) => { setYarnsInfo(yarnsInfo) }}
                            type="yarn"
                            defaultValue={yarnsInfo}
                        />
                        <p className={classes.additionalText}>{t('addToolsToSeeMoreOptions')}</p>
                        <BasicTabsForm
                            showError={showYarnsError}
                            getInfo={(toolsInfo: any) => { setToolsInfo(toolsInfo) }}
                            type="tool"
                            defaultValue={toolsInfo}
                        />
                        <p className={classes.additionalText}>{t('addOtherSuppliesToSeeMoreOptions')}</p>
                        <BasicTabsForm
                            showError={showYarnsError}
                            getInfo={(otherSuppliesInfo: any) => { setOtherSuppliesInfo(otherSuppliesInfo) }}
                            type="other supply"
                            defaultValue={otherSuppliesInfo}
                        />
                    </div>
                    <div className={classes.sectionContainer}>
                        <h2 className={classes.sectionHeader}>{t('filesAndNotes')}</h2>
                        <p className={classes.additionalText}>{t('addUpTo5FilesWithPatterns')}</p>
                        <div className={classes.fileInput}>
                            <FileInput
                                onlyImg={false}
                                addHeader={t('addPatterns')}
                                maxFiles={5}
                                defaultValue={selectedFiles}
                                selectedFiles={(patterns: any) => { setSelectedFiles(patterns) }}
                            />
                        </div>
                        <div className={classes.notesField}>
                            <TextEditor defaultValue={notes} getValue={(notes: any) => { setNotes(notes) }} />
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
                    {`${t(method === "POST" ? "createPattern" : "editPattern")}`}
                </Button>
            </form>
        </div>
    );
}
