import Counter from '../../components/Counter';
import * as React from 'react';
import classes from './NewCounter.module.scss';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

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
        setCounters([...counters, counter]);
    };
    console.log(counters);
    return (
        <div className={classes.container}>
            <div className={classes.counterContainer}>
                <h1>Counter</h1>
                <Counter getCounter={addCounter} />
            </div>
            <div className={classes.createdCounters}>
            <div className={classes.tableElements}>
            <div> <b> Name</b></div>
            <div><b> Count</b></div>
                 </div>
                {counters.map((counter: any) => (        
                    <div key={counter.name} className={classes.tableElements}>
                       <div> {counter.name}</div>
                       <div>{counter.amount}</div>
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
                                <button className={classes.menuElem}>Delete</button>
                            </MenuItem>
                    </Menu>
                </div>
                    </div>
                ))}
            </div>
        </div>
    );
}