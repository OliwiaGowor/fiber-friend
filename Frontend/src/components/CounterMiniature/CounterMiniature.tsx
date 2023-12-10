import * as React from 'react';
import classes from "./CounterMiniature.module.scss";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useTranslation } from 'react-i18next';

interface CounterMiniatureProps {
    editable: boolean;
    counter: any;
    deleteCounter?: any;
    backgroundColor?: string;
    boxShadow?: boolean;
}

export default function CounterMiniature(props: CounterMiniatureProps) {
    const { editable, counter, deleteCounter, backgroundColor, boxShadow = true, ...other } = props;
    const { t } = useTranslation('CounterMiniature');
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={`${classes.counter}` + (!boxShadow ? ` ${classes.noShadow}` : '')}
            style={{
                backgroundColor: (backgroundColor !== undefined) ? backgroundColor : ''
            }}
        >
            {editable && <div className={classes.settings}>
                <IconButton
                    aria-label="more"
                    id="edit-button"
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
                        <button
                            className={classes.menuElemBtn}
                            onClick={deleteCounter}
                            aria-label={t('deleteCounter')}
                        >
                            {t('deleteCounter')}
                        </button>
                    </MenuItem>
                </Menu>
            </div>
            }
            <h1 className={classes.counterName}>{counter.name}</h1>
            <div className={classes.number}>{counter.value}</div>
        </div>
    );
}