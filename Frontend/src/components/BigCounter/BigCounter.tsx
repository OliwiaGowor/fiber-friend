import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import classes from "./BigCounter.module.scss";

//FIXME: style number input
//FIXME: add auto width function to count input
//TODO: add count input validation (only numbers)

export default function BigCounter({ getCounter }: any) {
    const [count, setCount] = React.useState(0);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const openSetting = Boolean(anchorEl);
    const nameRef = React.useRef<HTMLInputElement | null>(null);
    const [openDialog, setOpenDialog] = React.useState(false);
    const manualValue = React.useRef<HTMLInputElement | null>(null);

    React.useEffect(() => {
        document.body.addEventListener("keydown", handleSpace);
        return () => {
            document.body.removeEventListener("keydown", handleSpace);
        };
    }, [count]);

    React.useEffect(() => {
        const counter = {
            name: nameRef.current?.value,
            amount: count,
        };
        getCounter(counter);
    }, [count, nameRef.current?.value]);


    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleSetCounter = (amount: number) => {
        setCount(amount);
        setOpenDialog(false);
    };

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseSetting = () => {
        setAnchorEl(null);
    };

    const handleSpace = (e: any) => {
        if (e.key === ' ') {
            e.preventDefault();
            setCount(count + 1);
        }
    };

    return (
        <div className={classes.container}>
            <div className={classes.counter}>
                <div className={classes.settings}>
                    <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={openSetting ? 'long-menu' : undefined}
                        aria-expanded={openSetting ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id="long-menu"
                        MenuListProps={{
                            'aria-labelledby': 'long-button',
                        }}
                        anchorEl={anchorEl}
                        open={openSetting}
                        onClose={handleCloseSetting}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        className={classes.settingsMenu}
                    >
                        <MenuItem className={classes.menuElem} onClick={handleCloseSetting}>
                            <button className={classes.menuElemBtn} onClick={() => { setCount(0) }}>Reset counter</button>
                        </MenuItem>
                        <MenuItem className={classes.menuElem} onClick={handleCloseSetting}>
                            <button className={classes.menuElemBtn} onClick={handleClickOpen}>Enter number</button>
                        </MenuItem>
                    </Menu>
                    <Dialog open={openDialog} onClose={handleCloseDialog}>
                        <DialogTitle>Edit</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Enter counter value:
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="amount"
                                label="Counter value"
                                type="text"
                                fullWidth
                                variant="standard"
                                inputRef={manualValue}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog}>Cancel</Button>
                            <Button onClick={() => { handleSetCounter(Number(manualValue.current?.value)) }}>Enter</Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <Input
                    className={classes.counterName}
                    id="counter-name"
                    placeholder={'Untitled counter'}
                    inputRef={nameRef}
                    endAdornment={
                        <InputAdornment position="end">
                            <EditIcon></EditIcon>
                        </InputAdornment>
                    }
                />
                <input
                    className={classes.number}
                    id="amount"
                    type="text"
                    value={count}
                />
                <div className={classes.buttons}>
                    <Button variant='contained' className={classes.subBtn} onClick={() => {
                        (count > 0) ? setCount(count - 1) : setCount(count);
                    }}
                    >
                        <RemoveIcon sx={{ color: 'rgba(0, 0, 0, 0.54)', fontSize: '5em' }} ></RemoveIcon>
                    </Button>
                    <Button variant='contained' className={classes.addBtn} onClick={() => {
                        setCount(count + 1);
                    }}
                    >
                        <AddIcon sx={{ color: 'rgba(0, 0, 0, 0.54)', fontSize: '5em' }}></AddIcon>
                    </Button>
                </div>
            </div>
            <p className={classes.additionalText}>Press space bar to increase the counter!</p>
        </div>
    );
}