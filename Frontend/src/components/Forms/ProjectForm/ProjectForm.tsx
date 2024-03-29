// ProjectForm.tsx
import { json, useNavigate } from "react-router-dom";
import classes from './ProjectForm.module.scss';
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CategoriesMenu from "../../CategoriesMenu/CategoriesMenu";
import { FileInput } from "../../FileInput/FileInput";
import BasicTabsForm from "../../TabsPanelForm/TabsPanelForm";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextEditor from "../../TextEditor/TextEditor";
import { getAuthToken } from "../../../utils/auth";
import dayjs from "dayjs";
import { useAppDispatch } from '../../../utils/hooks';
import { handleRequest } from "../../../utils/handleRequestHelper";
import { setError } from "../../../reducers/errorSlice";
import { NeedleworkType } from "../../../DTOs/Enums";
import { MyFile } from "../../../DTOs/MyFile";
import { useTranslation } from "react-i18next";

interface ProjectFormProps {
    project?: any;
    method: string;
}

export default function ProjectForm({ project, method }: ProjectFormProps) {
    const { t } = useTranslation("ProjectForm");
    const dispatch = useAppDispatch();
    const token = getAuthToken();
    const navigate = useNavigate();
    const [type, setType] = React.useState(project?.type ?? NeedleworkType.crochet);
    const [yarns, setYarns] = React.useState<any>(project?.yarns ?? []);
    const [name, setName] = React.useState(project?.name ?? '');
    const [category, setCategory] = React.useState<string | undefined>(project?.category ?? undefined);
    const [showYarnsError, setShowYarnsError] = React.useState<boolean>(false);
    const [showCategoriesError, setShowCategoriesError] = React.useState<boolean>(false);
    const [showNameError, setShowNameError] = React.useState<boolean>(false);
    const [proceedSubmit, setProceedSubmit] = React.useState<boolean>(true);
    const [dateError, setDateError] = React.useState<any>(null);
    const [startDate, setStartDate] = React.useState<any>(project?.startDate ?? null);
    const [endDate, setEndDate] = React.useState<any>(project?.endDate ?? null);
    const [requiredError, setRequiredError] = React.useState<any>(false);
    const [photos, setPhotos] = React.useState<MyFile[]>(project?.photos ?? []);
    const [files, setFiles] = React.useState<MyFile[]>(project?.patterns ?? []);
    const [notes, setNotes] = React.useState<any>(project?.notes ?? null);
    const [patterns, setPatterns] = React.useState<any>([]);
    const [selectedPattern, setSelectedPattern] = React.useState<any>(project?.connectedPattern ?? undefined);

    const fetchAvailablePatterns = React.useCallback(async () => {
        try {
            const data = await handleRequest(
                process.env.REACT_APP_API_URL === "prod" ? `${process.env.REACT_APP_API_URL}Pattern${process.env.REACT_APP_ENV === "dev" ? "" : ".json"}` :
                    `${process.env.REACT_APP_API_URL}Pattern/GetAllPatternsForUser/${localStorage.getItem("userId")}`,
                "GET",
                "Could not fetch available patterns. Please try again later.",
                token
            );

            setPatterns(data);

        } catch (error) {
            dispatch(setError(error));
        }
    }, []);

    React.useEffect(() => {
        fetchAvailablePatterns();
    }, []);

    const handleType = (event: React.MouseEvent<HTMLElement>, newType: NeedleworkType,) => {
        if (newType !== null) {
            setType(newType);
        }
    };

    const handleChange = (event: SelectChangeEvent) => {
        setSelectedPattern(event.target.value as string);
    };

    let dateErrorMessage = requiredError ? t('enterStartDate') : undefined;

    //Handle form submit - request
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formPhotos = photos.map((photo: any) => {
            return {
                name: photo.name,
                content: photo.content,
                type: photo.type,
            }
        });

        const formFiles = files.map((file: any) => {
            return {
                name: file.name,
                content: file.content,
                type: file.type,
            }
        });

        if (proceedSubmit) {
            const projectData: any = {
                name: name,
                type: type,
                category: category ?? "Other",
                startDate: startDate,
                photos: formPhotos,
                files: formFiles,
                notes: notes ?? "",
                connectedPatternId: selectedPattern ?? null,
                finished: endDate !== null ? true : false,
                userId: localStorage.getItem('userId') ?? "",
            };

            if (project) {
                projectData.id = project?.id;
                projectData.yarns = yarns.map((yarn: any) => {return {...yarn, projectId: project?.id }});
            } else {
                projectData.yarns = [...yarns];
            }

            if(endDate !== null) {
                projectData.endDate = endDate;
            }

            let url = method === "POST" ?
                `${process.env.REACT_APP_API_URL}Project${process.env.REACT_APP_ENV === "dev" ? "" : ".json"}` :
                `${process.env.REACT_APP_API_URL}Project/${project.id}${process.env.REACT_APP_ENV === "dev" ? "" : ".json"}`;

            try {
                await handleRequest(
                    url,
                    method,
                    t('couldNotSaveProject'),
                    token,
                    projectData
                );
                return navigate(method === "POST" ? '/fiber-friend/account/projects' : `/fiber-friend/account/projects/${project.id}`);

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
        if (yarns.length <= 0) {
            setShowYarnsError(true);
            setProceedSubmit(false);
        }
        if (!name) {
            setShowNameError(true);
            setProceedSubmit(false);
        }

        if (startDate == undefined) {
            setRequiredError(true);
            setProceedSubmit(false);
        }

        setProceedSubmit(true); // TODO: change to return
    };

    return (
        <div className={classes.container}>
            <h1 className={classes.header}>{`${method === "POST" ? t('createProject') : t('editProject')}`}</h1>
            <form onSubmit={handleSubmit} className={classes.form} >
                <div className={classes.formContent}>
                    <div className={classes.sectionContainer}>
                        <h2 className={classes.sectionHeader}>{t('details')}</h2>
                        <TextField
                            id="name"
                            inputProps={{
                                'aria-label': 'name',
                            }}
                            label={t('projectName')}
                            className={classes.formInput}
                            name='name'
                            error={showNameError}
                            helperText={showNameError ? t('enterProjectName') : ''}
                            onChange={(e) => { setShowNameError(false); setName(e.target.value) }}
                            value={name}
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
                            <CategoriesMenu
                                showError={showCategoriesError}
                                choseCategory={(categ: string) => { setCategory(categ) }}
                                defaultValue={category}
                            />
                        </div>
                        <div className={classes.datePickers}>
                            <DatePicker
                                className={classes.dateInput}
                                label={`${t('startDate')} *`}
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
                                minDate={startDate ?? undefined}
                                onChange={(newValue: any) => { setEndDate(newValue) }}
                                value={dayjs(endDate)}
                            />
                            <br></br>
                            <p className={classes.additionalText}>{t('addEndDate')}</p>
                        </div>
                    </div>

                    <div className={classes.sectionContainer}>
                        <h2 className={classes.sectionHeader}>{t('photos')}</h2>
                        <p className={classes.additionalText}>{t('addUpTo10Photos')}</p>
                        <div className={classes.photoInput}>
                            <FileInput
                                onlyImg={true}
                                addHeader={t('addPhoto')}
                                maxFiles={10}
                                defaultValue={photos}
                                selectedFiles={(images: any) => { setPhotos(images) }}
                            />
                        </div>
                    </div>

                    <div className={`${classes.sectionContainer} ${classes.formInput}`}>
                        <h2 className={classes.sectionHeader}>{t('yarnsAndTools')}</h2>
                        <p className={classes.additionalText}>{t('addYarnsToSeeMoreOptions')}</p>
                        <BasicTabsForm
                            showError={showYarnsError}
                            getInfo={(yarnsInfo: any) => { setYarns(yarnsInfo) }}
                            defaultValue={yarns}
                            type="yarn"
                        />
                    </div>

                    <div className={classes.sectionContainer}>
                        <h2 className={classes.sectionHeader}>{t('patternsAndNotes')}</h2>
                        <p className={classes.additionalText}>{t('choosePatternFromLibrary')}</p>
                        <InputLabel id="pattern-select">{t('pattern')}</InputLabel>
                        <Select
                            labelId="pattern-select"
                            id="pattern-select"
                            value={selectedPattern}
                            label={t('pattern')}
                            onChange={handleChange}
                            className={classes.patternSelect}
                        >
                            <MenuItem value=''>{t('selectPattern')}</MenuItem>
                            {patterns && patterns.map((pattern: any) => (
                                <MenuItem key={pattern.id} value={pattern.id}>{pattern.name}</MenuItem>
                            ))}
                        </Select>
                        <p className={classes.additionalText}>{t('addUpTo5FilesWithPatterns')}</p>
                        <div className={classes.photoInput}>
                            <FileInput
                                onlyImg={false}
                                addHeader={t('addPatterns')}
                                maxFiles={5}
                                defaultValue={patterns}
                                selectedFiles={(patterns: any) => { setFiles(patterns) }}
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
                >
                    {`${method === "POST" ? t('addNewProject') : t('editProject')}`}
                </Button>
            </form>
        </div>
    );
}
