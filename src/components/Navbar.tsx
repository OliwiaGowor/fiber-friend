import React from "react";
import { Link } from "react-router-dom";
import classes from './Navbar.module.scss';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logoPicture from '../photos/yarn-ball.png'

function Navbar() {

    return (
        <div className={classes.container}>
            <div className={classes.logo}>
                <Link to={"/"}>
                    <img className={classes.logoPicture} src={logoPicture} width='45px' height='45px'/>
                    Fiber Friend
                    </Link>
            </div>
            <ul className={classes.navElements}>
                <li>
                    <Link to={"account"}><AccountCircleIcon /></Link>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;