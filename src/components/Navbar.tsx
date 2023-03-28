import React, { useState } from "react";
import { Link } from "react-router-dom";
import classes from './Navbar.module.scss';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logoPicture from '../photos/yarn-ball.png'
import ClickAwayListener from '@mui/base/ClickAwayListener';
import SidebarAccount from "./SidebarAccount";
import { useMediaQuery } from "@mui/material";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width: 760px)');

    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    const handleClickAway = () => {
        setOpen(false);
    };

    return (
        <div className={classes.container}>
            <div className={classes.navbarContainer}>
                <div className={classes.navbar}>
                    <br className={classes.fillerDesktop}></br>
                    <div className={classes.logo}>
                        <Link to={"/fiber-friend"}>
                            <img className={classes.logoPicture} src={logoPicture} width='45px' height='45px' />
                            Fiber Friend
                        </Link>
                    </div>
                    <ul className={classes.navElements}>
                        <li className={classes.accountIcon} onClick={handleClick}>
                            <Link to={"account"}><AccountCircleIcon fontSize="inherit" /></Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={classes.sidebarContainer}>
                <ClickAwayListener onClickAway={handleClickAway}>
                    <SidebarAccount open={isMobile ? open : false}/>
                </ClickAwayListener>
            </div>
        </div>
    );
}