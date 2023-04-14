import Counter from '../../components/Counter';
import * as React from 'react';
import classes from './NewCounter.module.scss';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CounterMiniature from '../../components/CounterMiniature';

//TO DO: style saved as squares similar to counter
//TO DO: connecting counters to patterns/projects
export default function NewCounter() {
    const [counters, setCounters] = React.useState<any>([]);
    const nameRef = React.useRef<string | null>();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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

    console.log(counters);
    return (
        <div className={classes.container}>
            <div className={classes.counterContainer}>
                <h1>Counter</h1>
                <Counter getCounter={addCounter} />
            </div>

            <div className={classes.createdCounters}>
                {counters.map((counter: any) => (
                    <CounterMiniature editable={true} counter={counter} deleteCounter={() => {handleDeleteCounter(counter)}}/>
                ))}
            </div>
        </div>
    );
}