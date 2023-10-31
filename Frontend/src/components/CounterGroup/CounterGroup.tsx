import * as React from 'react';
import classes from "./CounterGroup.module.scss";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import BigCounter from '../BigCounter/BigCounter';
import CounterMiniature from '../CounterMiniature/CounterMiniature';

const CounterGroup = () => {
    const [tmpCounter, setTmpCounter] = React.useState();
    const [counters, setCounters] = React.useState<any>([]);
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const addCounter = (counter: any) => {
        setCounters([...counters, counter]);
    }

    const handleDeleteCounter = (counter: any) => {
        let tmpArray = counters.filter((c: any) =>
            c.id !== counter.id);

        for (let i = 0; i < tmpArray.length; i++) {
            tmpArray[i].id = i;
        }
        setCounters(tmpArray);
    };

    return (
        <div className={classes.container} >
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Add counter</DialogTitle>
                <DialogContent>
                    <BigCounter getCounter={setTmpCounter} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button
                        onClick={() => {
                            addCounter((tmpCounter));
                            handleCloseDialog();
                        }}
                    >
                        Enter
                    </Button>
                </DialogActions>
            </Dialog>
            
            <div className={classes.counters}>
            <Button className={classes.addButton} variant='contained' onClick={handleClickOpen}>
                <h2 className={classes.name}>Add counter</h2>
                <AddCircleIcon className={classes.addIcon} sx={{ fontSize: 100 }} />
            </Button>
                {counters!.map((counter: any, index: number) => (
                    <div className={classes.counter} key={index}>
                        <CounterMiniature editable={true} counter={counter} deleteCounter={() => { handleDeleteCounter(counter) }} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CounterGroup;