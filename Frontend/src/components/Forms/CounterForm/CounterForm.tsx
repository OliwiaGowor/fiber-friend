import classes from './CounterForm.module.scss';
import { json, useNavigate } from "react-router-dom";
import CounterMiniature from '../../CounterMiniature/CounterMiniature';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import BigCounter from '../../BigCounter/BigCounter';
import { tokenLoader } from '../../../utils/auth';
import FormHelperText from '@mui/material/FormHelperText';
import { InputLabelProps } from '@mui/material/InputLabel';
import Autocomplete from '@mui/material/Autocomplete';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch } from '../../../utils/hooks';
import { setError } from '../../../reducers/errorSlice';
import { handleRequest } from '../../../utils/handleRequestHelper';
import { useTranslation } from 'react-i18next';

interface CounterFormProps {
    counterGroup?: any;
    method: string;
}

export default function CounterForm({ counterGroup, method }: CounterFormProps) {
    const { t } = useTranslation("CounterForm");
    const dispatch = useAppDispatch();
    const token = tokenLoader();
    const navigate = useNavigate();
    const [counters, setCounters] = useState<any>(counterGroup?.counters ?? []);
    const [tmpCounter, setTmpCounter] = useState();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [showCounterGroupError, setShowCounterGroupError] = useState<boolean>(false);
    const [counterGroupName, setCounterGroupName] = useState<string | null>(counterGroup?.name ?? "");
    const [submitActive, setSubmitActive] = useState<boolean>(false);
    const [projects, setProjects] = useState<any>([]);
    const [patterns, setPatterns] = useState<any>([]);
    const [chosenPattern, setChosenPattern] = useState<any>(counterGroup?.patternId ?? undefined);
    const [chosenProject, setChosenProject] = useState<any>(counterGroup?.projectId ?? undefined);
    const [chosenParent, setChosenParent] = useState<any>(counterGroup?.patternId ?? counterGroup?.projectId ?? undefined);
    const autocompleteOptionsPatterns = useMemo(() => {
        return (patterns?.map((option: any) => {
            return ({ label: `${option.name}`, id: `${option.id}` })
        }))
    }, [patterns]);

    const autocompleteOptionsProjects = useMemo(() => {
        return (projects?.map((option: any) => {
            return ({ label: `${option.name}`, id: `${option.id}` })
        }))
    }, [projects]);

    useEffect(() => {
        if (counters.length > 0) {
            setSubmitActive(true);
        }
        else {
            setSubmitActive(false);
        }
    }, [counters]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = useCallback(async () => {
        let projectsData: any;
        let patternsData: any;

        try {
            projectsData = await handleRequest(
                `${process.env.REACT_APP_API_URL}Project/GetProjectsForUser/${localStorage.getItem("userId")}?page=1&pageSize=10`,
                'GET',
                t("couldNotLoadProjects"),
                tokenLoader()
            );
        } catch (error) {
            dispatch(setError(error));
        }
        setProjects(projectsData);

        try {
            patternsData = await handleRequest(
                `${process.env.REACT_APP_API_URL}Pattern/GetPatternsForUser/${localStorage.getItem("userId")}?page=1&pageSize=10`,
                'GET',
                t("couldNotLoadPatterns"),
                tokenLoader()
            );
        } catch (error) {
            dispatch(setError(error));
        }
        setPatterns(patternsData);
    }, []);

    const addCounter = (counter: any) => {
        setCounters([...counters, {
            name: counter.name,
            value: counter.value,
        }]);
    };

    const handleDeleteCounter = (counter: any) => {
        let tmpArray = counters.filter((c: any) =>
            c.id !== counter.id);

        for (let i = 0; i < tmpArray.length; i++) {
            tmpArray[i].id = i;
        }
        setCounters(tmpArray.map((counter: any) => {
            return {
                name: counter.name,
                value: counter.value,
            }}));
    };

    //Handle form submit - request
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (counterGroupName) {
            const counterData = {
                id: counterGroup?.id ?? null,
                name: counterGroupName,
                counters: counters,
                userId: localStorage.getItem("userId"),
                patternId: chosenPattern?.id ?? null,
                projectId: chosenProject?.id ?? null,
            };


            let url = method === "POST" ?
                `${process.env.REACT_APP_API_URL}CountersGroup${process.env.REACT_APP_ENV === "dev" ? "" : ".json"}` :
                `${process.env.REACT_APP_API_URL}CountersGroup/${counterGroup.id}${process.env.REACT_APP_ENV === "dev" ? "" : ".json"}`;

            try {
                await handleRequest(
                    url,
                    method,
                    t("couldNotSaveCounters"),
                    tokenLoader(),
                    counterData);
                return navigate('/fiber-friend/account/counters');

            } catch (error) {
                dispatch(setError(error));
                return;
            }
        } else {
            setShowCounterGroupError(true);
            return;
        }
    };

    return (
        <div className={classes.container}>
            <form onSubmit={handleSubmit}>
                <div className={classes.counterContainer}>
                    <h1>{t('counter')}</h1>
                    <div className={classes.sectionContainer} >
                        <h2 className={classes.sectionHeader}>{t('details')}</h2>
                        <TextField
                            id="counterGroupName"
                            inputProps={{
                                'aria-label': 'counterGroupName',
                            }}
                            label={t('counterGroupName')}
                            className={classes.formInput}
                            name='counterGroupName'
                            value={counterGroupName}
                            error={showCounterGroupError}
                            helperText={showCounterGroupError ? t('enterCounterGroupName') : ''}
                            onChange={(e) => { setShowCounterGroupError(false); setCounterGroupName(e.target.value); }}
                        />
                        <div className={classes.projectsPatternsSection}>
                            <Autocomplete
                                freeSolo
                                size="medium"
                                className={classes.formInput}
                                options={autocompleteOptionsPatterns ?? undefined}
                                renderInput={(params) => <TextField {...params} variant='outlined' label={t("selectPattern")} InputLabelProps={{ children: '' } as Partial<InputLabelProps>} />}
                                onChange={(event: React.SyntheticEvent, newValue: string | null) => { setChosenPattern(newValue) }}
                                value={chosenPattern}
                                disabled={chosenProject !== undefined}
                            />
                            <Autocomplete
                                freeSolo
                                size="medium"
                                className={classes.formInput}
                                options={autocompleteOptionsProjects ?? undefined}
                                renderInput={(params) => <TextField {...params} variant='outlined' label={t("selectProject")} InputLabelProps={{ children: '' } as Partial<InputLabelProps>} />}
                                onChange={(event: React.SyntheticEvent, newValue: string | null) => { setChosenProject(newValue) }}
                                value={chosenProject}
                                disabled={chosenPattern !== undefined}
                            />
                        </div>
                        <FormHelperText>{t("connectCountersToProjectOrPattern")}</FormHelperText>
                    </div>
                    <BigCounter getCounter={setTmpCounter} />
                </div>
                <div className={classes.btnContainer} >
                    <Button
                        className={classes.btnAddCounter}
                        variant='contained'
                        onClick={() => addCounter(tmpCounter)}
                    >
                        {t("addCounter")}
                    </Button>
                </div>
                <div className={classes.createdCounters}>
                    {counters.map((counter: any, index: number) => (
                        <CounterMiniature
                            key={index}
                            editable={true}
                            counter={counter}
                            deleteCounter={() => {
                                handleDeleteCounter(counter)
                            }}
                        />
                    ))}
                </div>
                <div className={classes.btnContainer} >
                    <Button
                        className={` ${submitActive ? classes.submitBtn : classes.submitBtnOff}`}
                        variant='contained'
                        type='submit'
                        disabled={!submitActive}
                    >
                        {`${t(method === 'POST' ? 'create' : 'edit')} ${t('counterGroup')}`}
                    </Button>
                </div>
            </form>
        </div>
    );
}
