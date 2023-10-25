import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from './Navbar.module.scss';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logoPicture from '../../photos/yarn-ball.png';
import SidebarAccount from "../SidebarAccount/SidebarAccount";
import { useMediaQuery } from "@mui/material";

export default function Navbar() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width: 760px)');
    const smallerLogo = useMediaQuery('(max-width: 560px)');

    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    return (
        <nav className={classes.container}>
            <div className={classes.navbar}>
                <br className={classes.fillerDesktop}></br>
                <div className={classes.logo}>
                    <Link to={"/fiber-friend"}>
                        <img className={classes.logoPicture} src={logoPicture} width='45px' height='45px' />
                        {!smallerLogo && 'Fiber Friend'}
                    </Link>
                </div>
                <ul className={classes.navElements}>
                    <li className={classes.accountIcon} onClick={handleClick}>
                        <AccountCircleIcon fontSize="inherit" onClick={() => { if (!isMobile) navigate("account") }} />
                    </li>
                </ul>
            </div>
            <div className={classes.sidebarContainer}>
                <SidebarAccount open={isMobile ? open : false} getOpen={(isOpen: boolean) => setOpen(isOpen)} />
            </div>
        </nav>
    );
}