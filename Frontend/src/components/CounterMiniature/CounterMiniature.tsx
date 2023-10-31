import * as React from 'react';
import classes from "./CounterMiniature.module.scss";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface CounterMiniatureProps {
    editable: boolean;
    counter: any;
    deleteCounter?: any;
    backgroundColor?: string;
}

export default function CounterMiniature(props: CounterMiniatureProps) {
    const { editable, counter, deleteCounter, backgroundColor, ...other } = props;
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.counter}
            style={{
                backgroundColor: (backgroundColor !== undefined) ? backgroundColor : ''
            }}
        >
            {editable && <div className={classes.settings}>
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
                    className={classes.settingsMenu}
                >
                    <MenuItem onClick={handleClose} className={classes.menuElem}>
                        <button className={classes.menuElemBtn} onClick={deleteCounter}>Delete counter</button>
                    </MenuItem>
                </Menu>
            </div>
            }
            <h1 className={classes.counterName}>{counter.name}</h1>
            <div className={classes.number}>{counter.amount}</div>
        </div>
    );
}