import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import SidebarAccount from "../SidebarAccount/SidebarAccount";
import { useMediaQuery } from "@mui/material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import logoPicture from '../../photos/yarn-ball.png';

import classes from './Navbar.module.scss';

export default function Navbar() {
    const navigate = useNavigate();
    const [openSidebar, setOpenSidebar] = useState(false);
    const isMobile = useMediaQuery('(max-width: 760px)');
    const smallerLogo = useMediaQuery('(max-width: 560px)');
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLSpanElement>(null);
    const openAdd = Boolean(anchorEl);

    const handleClickMenu = () => {
        setOpenSidebar((prev) => !prev);
    };

    const handleClickAdd = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget); //TODO: add closing on clicking again
    };

    const handleCloseAdd = () => {
        setAnchorEl(null);
    };

    return (
        <nav className={classes.navbar}>
            <ul className={classes.navElements}>
                {!isMobile && <br className={classes.fillerDesktop}></br>}
                {!isMobile &&
                    <div className={classes.logo}>
                        <Link to={"/fiber-friend"}>
                            <img
                                className={classes.logoPicture}
                                src={logoPicture}
                                alt="Fiber Friend Logo"
                                width='45px'
                                height='45px'
                            />
                            {!smallerLogo && 'Fiber Friend'}
                        </Link>
                    </div>
                }
                {isMobile &&
                    <li className={classes.menuIcon}>
                        <button onClick={handleClickMenu} aria-label="Toggle Menu">
                            <MenuIcon sx={{ fontSize: 43 }} />
                        </button>
                    </li>
                }
                {isMobile &&
                    <li className={classes.addIcon} >
                        <button
                            onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleClickAdd(e)}
                            aria-label="Add"
                        >
                            <AddCircleIcon className={classes.addIcon} sx={{ fontSize: 46 }} />
                        </button>
                        <Menu
                            className={classes.addMenu}
                            anchorEl={anchorEl}
                            open={openAdd}
                            onClose={handleCloseAdd}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                            transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                            PaperProps={{ className: `${classes.addMenuPaper}` }}
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
                    </li>
                }
                <li className={classes.accountIcon}>
                    <button
                        onClick={() => { navigate("account") }}
                        aria-label="Account"
                    >
                        <AccountCircleIcon sx={{ fontSize: 43 }} />
                    </button>
                </li>
            </ul>
            <div className={classes.sidebarContainer}>
                <SidebarAccount open={isMobile ? openSidebar : false} getOpen={(isOpen: boolean) => setOpenSidebar(isOpen)} />
            </div>
        </nav>
    );
}