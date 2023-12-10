import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import EditIcon from '@mui/icons-material/Edit';
import Button from "@mui/material/Button";
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import classes from "./BigCounter.module.scss";
import { useTranslation } from 'react-i18next';

interface BigCounterProps {
    getCounter: (counter: any) => void;
}

export default function BigCounter({ getCounter }: BigCounterProps) {
    const {t} = useTranslation("BigCounter");
    const [count, setCount] = React.useState(0);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const openSetting = Boolean(anchorEl);
    const [counterName, setCounterName] = React.useState<string>("");
    const [openDialog, setOpenDialog] = React.useState(false);
    const manualValue = React.useRef<HTMLInputElement | null>(null);
    const countInputRef = React.useRef<HTMLInputElement | null>(null);

    React.useEffect(() => {
        document.body.addEventListener("keydown", handleSpace);
        return () => {
            document.body.removeEventListener("keydown", handleSpace);
        };
    }, [count]);

    React.useEffect(() => {
        const counter = {
            name: counterName,
            amount: count,
        };
        getCounter(counter);
    }, [count, counterName]);

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleSetCount = (number: string) => {
        if (number && /^\d+$/.test(number)) {
            setCount(Number(number));
            setOpenDialog(false);
        } else {
            return;
        }
    };

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseSetting = () => {
        setAnchorEl(null);
    };

    const handleSpace = (e: KeyboardEvent) => {
        if (e.key === ' ') {
            e.preventDefault();
            setCount(count + 1);
        }
    };

    return (
        <div className={classes.container}>
            <div className={classes.counter}>
                {/*<div className={classes.settings}>
                    <IconButton
                        aria-label="More Options"
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
                    </div>*/}
                <Input
                    className={classes.counterName}
                    id="counter-name"
                    placeholder={t('counterTitle')}
                    value={counterName}
                    onChange={(e) => { setCounterName(e.target.value) }}
                    endAdornment={
                        <InputAdornment position="end">
                            <EditIcon aria-label={t('editCounterName')}></EditIcon>
                        </InputAdornment>
                    }
                />
                <input
                    className={classes.number}
                    id="amount"
                    type="number"
                    value={count}
                    onChange={(e) => { setCount(Number(e.target.value)) }}
                    aria-label="Counter Value"
                    ref={countInputRef}
                />
                <div className={classes.buttons}>
                    <Button variant='contained' className={classes.subBtn} onClick={() => {
                        (count > 0) ? setCount(count - 1) : setCount(count);
                    }}
                        aria-label={t("decreaseCounter")}
                    >
                        <RemoveIcon sx={{ color: 'rgba(0, 0, 0, 0.54)', fontSize: '5em' }} ></RemoveIcon>
                    </Button>
                    <Button variant='contained' className={classes.addBtn} onClick={() => {
                        setCount(count + 1);
                    }}
                        aria-label={t("increaseCounter")}
                    >
                        <AddIcon sx={{ color: 'rgba(0, 0, 0, 0.54)', fontSize: '5em' }}></AddIcon>
                    </Button>
                </div>
            </div>
            <p className={classes.additionalText}>{t("pressSpace")} </p>
        </div>
    );
}