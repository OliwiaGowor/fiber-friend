import { Link } from "react-router-dom";
import classes from './SidebarAccount.module.scss'
import GridOnIcon from '@mui/icons-material/GridOn';
import SettingsIcon from '@mui/icons-material/Settings';
import BrushIcon from '@mui/icons-material/Brush';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CalculateIcon from '@mui/icons-material/Calculate';
import Divider from "@mui/material/Divider";
import * as React from 'react';

function SidebarAccount({ open, getOpen }: any) {
    const [isOpen, setIsOpen] = React.useState(open);
    
    React.useEffect(() => {
       setIsOpen(open);
    });

    return (
        <aside className={ isOpen ? `${classes.container}` : `${classes.containerHidden}`}>

            <h2 className={classes.header}>
                <Link to={'/fiber-friend/account'} className={classes.link} onClick={() => {setIsOpen(false); getOpen((prev: boolean) => !prev);}}>
                    <AccountCircleIcon />
                    <div className={classes.text}>Account</div>
                </Link>
            </h2>
            <ul className={classes.elements}>
                <li className={classes.element}>
                    <Link to={'/fiber-friend/account/projects'} className={classes.link} onClick={() => {setIsOpen(false); getOpen((prev: boolean) => !prev);}}>
                        <GridOnIcon />
                        <div className={classes.text}>Projects</div>
                    </Link>
                </li>
                <li className={classes.element}>
                    <Link to={'/fiber-friend/account/patterns'} className={classes.link} onClick={() => {setIsOpen(false); getOpen((prev: boolean) => !prev);}}>
                        <BrushIcon />
                        <div className={classes.text}>Patterns</div>
                    </Link>
                </li>
                <li className={classes.element}>
                    <Link to={'/fiber-friend/account/counters'} className={classes.link} onClick={() => {setIsOpen(false); getOpen((prev: boolean) => !prev);}}>
                        <CalculateIcon />
                        <div className={classes.text}>Counters</div>
                    </Link>
                </li>
                {/*<li className={classes.element}>
                    <Link to={'orders'} className={classes.link}>
                        <ShoppingBasketIcon />
                        <div className={classes.text}>Orders</div>
                    </Link>
                </li>*/}
                <li className={classes.element}>
                    <Link to={'/fiber-friend/account/supplies'} className={classes.link} onClick={() => {setIsOpen(false); getOpen((prev: boolean) => !prev);}}>
                        <ShoppingBasketIcon />
                        <div className={classes.text}>Supplies</div>
                    </Link>
                </li>

                <span className={classes.divider} />
                <li className={classes.element}>
                    <Link to={'/fiber-friend/account/settings'} className={classes.link} onClick={() => {setIsOpen(false); getOpen((prev: boolean) => !prev);}}>
                        <SettingsIcon />
                        <div className={classes.text}>Settings</div>
                    </Link>
                </li>
            </ul>
        </aside>
    );

}

export default SidebarAccount;