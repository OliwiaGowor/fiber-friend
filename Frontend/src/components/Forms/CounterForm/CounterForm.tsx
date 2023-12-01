
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

interface CounterFormProps {
    counterGroup?: any;
    method: string;
}

export default function CounterForm({ counterGroup, method }: CounterFormProps) {
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
    const [projectsAndPatterns, setProjectsAndPatterns] = useState<any>([]);
    const [chosenParent, setChosenParent] = useState<any>(counterGroup?.parentId ?? undefined);
    const autocompleteOptions = useMemo(() => {
        return (projectsAndPatterns?.map((option: any) => {
            return ({ label: `${option.name} (${option.type})`, id: `${option.id}` })
        }))
    }, [projectsAndPatterns]);

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
        let projects = [];

        const responseProjects = await fetch(`${process.env.REACT_APP_API_URL}Project${process.env.REACT_APP_ENV === "dev" ? "" : ".json"}`, {
            headers: {
                'Content-Type': 'application/json',
                //Authorization: "Bearer " + token,
            },
        });
        if (!responseProjects.ok) {
            dispatch(setError({
                code: responseProjects.status,
                message: responseProjects.statusText,
                customMessage: "Could not fetch available projects. Please try again later."
            }));
            return;

        } else {
            projects = await responseProjects.json();
            projects = Object.values(projects).map((project: any) => {
                return { ...project, type: 'project' };
            });
        }

        const responsePatterns = await fetch(`${process.env.REACT_APP_API_URL}Pattern${process.env.REACT_APP_ENV === "dev" ? "" : ".json"}`, {
            headers: {
                'Content-Type': 'application/json',
                //Authorization: "Bearer " + token,
            },
        });
        if (!responsePatterns.ok) {
            dispatch(setError({
                code: responseProjects.status,
                message: responseProjects.statusText,
                customMessage: "Could not fetch available patterns. Please try again later."
            }));
            return;

        }
        let patterns = await responsePatterns.json();
        patterns = Object.values(patterns).map((pattern: any) => {
            return { ...pattern, type: 'pattern' };
        });

        setProjectsAndPatterns([...Array.from(patterns), ...projects]);
    }, []);

    const addCounter = (counter: any) => {
        setCounters([...counters, {
            id: counters.length,
            name: counter.name,
            amount: counter.amount,
        }]);
    };

    const handleDeleteCounter = (counter: any) => {
        let tmpArray = counters.filter((c: any) =>
            c.id !== counter.id);

        for (let i = 0; i < tmpArray.length; i++) {
            tmpArray[i].id = i;
        }
        setCounters(tmpArray);
    };

    //Handle form submit - request
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (counterGroupName) {
            const counterData = {
                name: counterGroupName,
                counters: counters,
                parentId: chosenParent?.id ?? null,
            };

            let url = method === "POST" ?
                `${process.env.REACT_APP_API_URL}CounterGroup${process.env.REACT_APP_ENV === "dev" ? "" : ".json"}` :
                `${process.env.REACT_APP_API_URL}CounterGroup/${counterGroup.id}${process.env.REACT_APP_ENV === "dev" ? "" : ".json"}`;

            try {
                await handleRequest(
                    url,
                    method,
                    "Could not save counters. Please try again later.",
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
                    <h1>Counter</h1>
                    <div className={classes.sectionContainer} >
                        <h2 className={classes.sectionHeader}>Details</h2>
                        <TextField
                            id="counterGroupName"
                            inputProps={{
                                'aria-label': 'counterGroupName',
                            }}
                            label="Counter group name"
                            className={classes.formInput}
                            name='counterGroupName'
                            value={counterGroupName}
                            error={showCounterGroupError}
                            helperText={showCounterGroupError ? 'Enter counter group name!' : ''}
                            onChange={(e) => { setShowCounterGroupError(false); setCounterGroupName(e.target.value); }}
                        />
                        <Autocomplete
                            freeSolo
                            size="medium"
                            className={classes.formInput}
                            options={autocompleteOptions ?? undefined}
                            renderInput={(params) => <TextField {...params} variant='outlined' label="Select project" InputLabelProps={{ children: '' } as Partial<InputLabelProps>} />}
                            onChange={(event: React.SyntheticEvent, newValue: string | null) => setChosenParent(newValue)}
                            value={chosenParent}
                        />
                        <FormHelperText>You can connect the counters to your project or pattern!</FormHelperText>
                    </div>
                    <BigCounter getCounter={setTmpCounter} />
                </div>
                <div className={classes.btnContainer} >
                    <Button
                        className={classes.btnAddCounter}
                        variant='contained'
                        onClick={() => addCounter(tmpCounter)}
                    >
                        Add counter
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
                        {`${method === 'POST' ? 'Create' : 'Edit'} counter group`}
                    </Button>
                </div>
            </form>
        </div>
    );
}