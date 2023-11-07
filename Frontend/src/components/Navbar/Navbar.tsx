import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from './Navbar.module.scss';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import logoPicture from '../../photos/yarn-ball.png';
import SidebarAccount from "../SidebarAccount/SidebarAccount";
import { useMediaQuery } from "@mui/material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React from "react";

export default function Navbar() {
    const navigate = useNavigate();
    const [openSidebar, setOpenSidebar] = useState(false);
    const isMobile = useMediaQuery('(max-width: 760px)');
    const smallerLogo = useMediaQuery('(max-width: 560px)');
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLSpanElement>(null);
    const openAdd = Boolean(anchorEl);

    const handleClickAccount = () => {
        setOpenSidebar((prev) => !prev);
    };

    const handleClickAdd = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget); //TODO: add closing on clicking again
    };

    const handleCloseAdd = () => {
        setAnchorEl(null);
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
                    {isMobile &&
                        <li className={classes.addIcon} >
                            <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleClickAdd(e)}>
                                <AddCircleIcon className={classes.addIcon} sx={{ fontSize: 46 }} />
                                </button>
                            <div className={classes.addMenu}>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={openAdd}
                                    onClose={handleCloseAdd}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                >
                                    <MenuItem onClick={() => {
                                        handleCloseAdd();
                                        navigate("account/projects/new-project");
                                    }}
                                    >
                                        Add project
                                    </MenuItem>
                                    <MenuItem onClick={() => {
                                        handleCloseAdd();
                                        navigate("account/patterns/new-pattern");
                                    }}
                                    >
                                        Add pattern
                                    </MenuItem>
                                    <MenuItem onClick={() => {
                                        handleCloseAdd();
                                        navigate("account/supplies/new-supply");
                                    }}
                                    >
                                        Add supply
                                    </MenuItem>
                                    <MenuItem onClick={() => {
                                        handleCloseAdd();
                                        navigate("account/counters/new-counter");
                                    }}
                                    >
                                        Add counter
                                    </MenuItem>
                                </Menu>
                            </div>
                        </li>
                    }
                    <li className={classes.accountIcon} onClick={handleClickAccount}>
                        <AccountCircleIcon fontSize="inherit" onClick={() => { if (!isMobile) navigate("account") }} />
                    </li>
                </ul>
            </div>
            <div className={classes.sidebarContainer}>
                <SidebarAccount open={isMobile ? openSidebar : false} getOpen={(isOpen: boolean) => setOpenSidebar(isOpen)} />
            </div>
        </nav>
    );
}