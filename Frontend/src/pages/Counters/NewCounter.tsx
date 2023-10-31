import CounterGroup from '../../components/BigCounter/BigCounter';
import * as React from 'react';
import classes from './NewCounter.module.scss';
import { json, useNavigate } from "react-router-dom";
import CounterMiniature from '../../components/CounterMiniature/CounterMiniature';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import BigCounter from '../../components/BigCounter/BigCounter';
//FIXME: move counters to countergroup?
//TODO: connecting counters to patterns/projects
export default function NewCounter() {
    const navigate = useNavigate();
    const [counters, setCounters] = React.useState<any>([]);
    const [tmpCounter, setTmpCounter] = React.useState();
    const nameRef = React.useRef<string | null>();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [showCounterGroupError, setShowCounterGroupError] = React.useState<boolean>(false);
    const counterGroupNameRef = React.useRef<HTMLInputElement | null>(null);
    const [submitActive, setSubmitActive] = React.useState<boolean>(false);
    const [availableProjects, setAvailableProjects] = React.useState<any | null>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [chosenProject, setChosenProject] = React.useState<any | null>(null);

    const fetchAvailableProjects = React.useCallback(async () => {
        setIsLoading(true);
        const response = await fetch('https://fiber-frined-default-rtdb.europe-west1.firebasedatabase.app/projects.json');
        if (!response.ok) {
            throw json(
                { message: 'Could not fetch projects.' },
                {
                    status: 500,
                }
            );
        } else {
            const data = await response.json();
            const loadedProjects = [];

            for (const key in data) {
                loadedProjects.push({
                    id: parseInt(data[key].id),
                    name: data[key].name,
                    category: data[key].category,
                    type: data[key].type,
                })
            };
            setAvailableProjects(loadedProjects);
        }
        setIsLoading(false);
    }, []);


    React.useEffect(() => {
        if (counters.length > 0) {
            setSubmitActive(true);
        }
        else {
            setSubmitActive(false);
        }
        fetchAvailableProjects();
    }, [submitActive, counters, isLoading]);

    const addCounter = (counter: any) => {
        setCounters([...counters, {
            id: counters.length,
            name: counter.name,
            amount: counter.amount,
        }]);
    };

    const handleChange = (event: SelectChangeEvent) => {
        setChosenProject(event.target.value);
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
        const method = 'post';
        if (counterGroupNameRef.current?.value.length) {
            const counterData = {
                name: counterGroupNameRef.current?.value,
                counters: counters,
            };
            let url = 'https://fiber-frined-default-rtdb.europe-west1.firebasedatabase.app/counterGroups.json';

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(counterData),
            });

            if (response.status === 422) {
                return response;
            }

            if (!response.ok) {
                throw json({ message: 'Could not save counter.' }, { status: 500 });
            }
            const data = await response.json();
            return navigate('/fiber-friend/account/counters');
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
                            inputRef={counterGroupNameRef}
                            error={showCounterGroupError}
                            helperText={showCounterGroupError ? 'Enter counter group name!' : ''}
                            onChange={() => { setShowCounterGroupError(false) }}
                        />
                        {/*<FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-multiple-name-label">Project</InputLabel>
                            <Select
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"
                                value={chosenProject}
                                onChange={handleChange}
                            >
                                {availableProjects && availableProjects.map((project: any) => (
                                    <MenuItem
                                        key={project.id}
                                        value={project.id}
                                    >
                                        {project.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>With label + helper text</FormHelperText>
                                </FormControl>*/}
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
                    {counters.map((counter: any) => (
                        <CounterMiniature editable={true} counter={counter} deleteCounter={() => { handleDeleteCounter(counter) }} />
                    ))}
                </div>
                <div className={classes.btnContainer} >
                    <Button className={` ${submitActive ? classes.submitBtn : classes.submitBtnOff}`} variant='contained' type='submit'>Create </Button>
                </div>
            </form>
        </div>
    );
}