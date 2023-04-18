import Counter from '../../components/Counter';
import * as React from 'react';
import classes from './NewCounter.module.scss';
import { json, useNavigate } from "react-router-dom";
import CounterMiniature from '../../components/CounterMiniature';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

//TO DO: style saved as squares similar to counter
//TO DO: connecting counters to patterns/projects
export default function NewCounter() {
    const navigate = useNavigate();
    const [counters, setCounters] = React.useState<any>([]);
    const nameRef = React.useRef<string | null>();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [showCounterGroupError, setShowCounterGroupError] = React.useState<boolean>(false);
    const counterGroupNameRef = React.useRef<HTMLInputElement | null>(null);
    const [submitActive, setSubmitActive] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (counters.length > 0) {
            setSubmitActive(true);
        }
        else {
            setSubmitActive(false);
        }
    }, [submitActive, counters]);
    console.log(submitActive);
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
        const method = 'post';
        if (counterGroupNameRef.current?.value.length) {
            const counterData = {
                id: Math.floor(Math.random()) * 10000,
                counterGroupName: counterGroupNameRef.current?.value,
                counters: counters,
            };
            let url = 'https://fiber-frined-default-rtdb.europe-west1.firebasedatabase.app/counters.json';

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
                    </div>
                    <Counter getCounter={addCounter} />
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