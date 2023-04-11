import * as React from 'react';
import classes from "./Counter.module.scss";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import EditIcon from '@mui/icons-material/Edit';

const options = [
    'None',
    'Atria',
    'Callisto',
    'Dione',
    'Ganymede',
  ];

export default function Counter({getCounter}: any) {
    const [count, setCount] = React.useState(0);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [counterName, setCounterName] = React.useState<string | null>(null);
    const nameRef = React.useRef<HTMLInputElement | null>(null);
    

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const createCounter = () => {
        const counter = {
            name: nameRef.current?.value,
            amount: count,
        };
        getCounter(counter);
    };

    return (
        <div className={classes.container}>
            <div className={classes.counter}>
                <div className={classes.settings}>
                    <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? 'long-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
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
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    >
                            <MenuItem onClick={handleClose}>
                                <button className={classes.menuElem}>Reset counter</button>
                            </MenuItem>
                    </Menu>
                </div>
                <Input 
                className={classes.counterName} 
                id="counter-name"  
                defaultValue={'Untitled counter'}
                inputRef={nameRef}
                endAdornment={
                    <InputAdornment position="end">
                      <EditIcon></EditIcon>
                    </InputAdornment>
                  }
                />
                <div className={classes.number}>{count}</div>
                <div className={classes.buttons}>
                    <Button variant='contained' className={classes.subBtn} onClick={() => { (count > 0) ? setCount(count - 1) : setCount(count) }}>
                        <RemoveIcon></RemoveIcon>
                    </Button>
                    <Button variant='contained' className={classes.addBtn} onClick={() => { setCount(count + 1) }}>
                        <AddIcon></AddIcon>
                    </Button>
                </div>
            </div>
            <Button variant='contained' onClick={createCounter}>Add counter</Button>
        </div>
    );
}