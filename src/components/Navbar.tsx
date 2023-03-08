import React from "react";
import { Link } from "react-router-dom";
import classes from './Navbar.module.scss';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Navbar (){

    return (
        <div className={classes.container}>
            <ul className={classes.navElements}>
                <li>
                    <Link to={"/"}>Fiber Friend</Link>
                </li>
                <li>
                    <Link to={"account"}><AccountCircleIcon /></Link>
                </li>
            </ul>   
        </div>
    );
}

export default Navbar;