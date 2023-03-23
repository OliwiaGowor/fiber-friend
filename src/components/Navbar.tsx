import React from "react";
import { Link } from "react-router-dom";
import classes from './Navbar.module.scss';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logoPicture from '../photos/yarn-ball.png'

export default function Navbar() {

    return (
        <div className={classes.container}>
            <div className={classes.logo}>
                <Link to={"/"}>
                    <img className={classes.logoPicture} src={logoPicture} width='47px' height='47px'/>
                    Fiber Friend
                    </Link>
            </div>
            <ul className={classes.navElements}>
                <li>
                    <Link to={"account"}><AccountCircleIcon fontSize="large"/></Link>
                </li>
            </ul>
        </div>
    );
}