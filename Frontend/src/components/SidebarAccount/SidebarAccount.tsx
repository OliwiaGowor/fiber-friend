import * as React from 'react';
import { Link } from "react-router-dom";
import useMediaQuery from '@mui/material/useMediaQuery';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import GridOnIcon from '@mui/icons-material/GridOn';
import SettingsIcon from '@mui/icons-material/Settings';
import BrushIcon from '@mui/icons-material/Brush';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CalculateIcon from '@mui/icons-material/Calculate';
import InsightsIcon from '@mui/icons-material/Insights';
import classes from './SidebarAccount.module.scss'

function SidebarAccount({ open, getOpen }: any) {
    const [isOpen, setIsOpen] = React.useState<boolean>(true);
    const isMobile = useMediaQuery('(max-width: 760px)');

    React.useEffect(() => {
        setIsOpen(open);
    }, [open]);

    const handleClickAway = () => {
        if (isOpen && isMobile) {
            setIsOpen(false);
            getOpen(false)
        }
    };

    const handleClick = () => {
        if (isMobile) {
            setIsOpen(false);
            getOpen((prev: boolean) => !prev);
        }
    }

    return (
        <ClickAwayListener onClickAway={handleClickAway} touchEvent={'onTouchStart'}>
            <aside className={isOpen ? `${classes.container}` : `${classes.containerHidden}`}>
                <h2 className={classes.header}>
                    <Link to={'/fiber-friend/account'} className={classes.link} onClick={handleClick}>
                        <AccountCircleIcon />
                        <div className={classes.text}>Account</div>
                    </Link>
                </h2>
                <ul className={classes.elements}>
                    <li className={classes.element}>
                        <Link to={'/fiber-friend/account/projects'} className={classes.link} onClick={handleClick}>
                            <GridOnIcon />
                            <div className={classes.text}>Projects</div>
                        </Link>
                    </li>
                    <li className={classes.element}>
                        <Link to={'/fiber-friend/account/patterns'} className={classes.link} onClick={handleClick}>
                            <BrushIcon />
                            <div className={classes.text}>Patterns</div>
                        </Link>
                    </li>
                    <li className={classes.element}>
                        <Link to={'/fiber-friend/account/counters'} className={classes.link} onClick={handleClick}>
                            <CalculateIcon />
                            <div className={classes.text}>Counters</div>
                        </Link>
                    </li>
                    <li className={classes.element}>
                        <Link to={'/fiber-friend/account/supplies'} className={classes.link} onClick={handleClick}>
                            <ShoppingBasketIcon />
                            <div className={classes.text}>Supplies</div>
                        </Link>
                    </li>
                    <li className={classes.element}>
                    <Link to={'statistics'} className={classes.link}>
                        <InsightsIcon />
                        <div className={classes.text}>Statistics</div>
                    </Link>
                </li>

                    <span className={classes.divider} />
                    <li className={classes.element}>
                        <Link to={'/fiber-friend/account/settings'} className={classes.link} onClick={handleClick}>
                            <SettingsIcon />
                            <div className={classes.text}>Settings</div>
                        </Link>
                    </li>
                </ul>
            </aside>
        </ClickAwayListener>
    );
}

export default SidebarAccount;