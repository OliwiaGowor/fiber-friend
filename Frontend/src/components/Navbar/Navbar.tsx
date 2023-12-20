import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import SidebarAccount from "../SidebarAccount/SidebarAccount";
import { useMediaQuery } from "@mui/material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import logoPicture from '../../photos/yarn-ball.png';

import classes from './Navbar.module.scss';
import { getAuthToken } from "../../utils/auth";
import { CommunityPatternsIcon } from "../../svg/NavigationIcons";

export default function Navbar() {
    const isLoggedIn = getAuthToken() !== null;
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
            <ul className={`${classes.navElements} ${isLoggedIn ? "" : classes.loggedOut}`}>     
                {((isMobile && !isLoggedIn) || !isMobile) &&
                    <div className={classes.logo}>
                        <Link to={"/fiber-friend"}>
                            <img
                                className={classes.logoPicture}
                                src={logoPicture}
                                alt="Fiber Friend Logo"
                                width='45px'
                                height='45px'
                            />
                            {!smallerLogo && !isLoggedIn && 'Fiber Friend'}
                        </Link>
                    </div>
                }
                <li className={classes.navElement}>
                    <button className={classes.communityPatternsBtn} onClick={() => navigate("/fiber-friend/community-patterns")}>
                        <CommunityPatternsIcon className={classes.communityPatternsIcon} />
                        <span className={classes.btnText}>Community patterns</span>
                    </button>
                </li>
                {isLoggedIn && <>
                    <li className={classes.navElement}>
                        <button
                            className={classes.addNew}
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
                            anchorOrigin={{ vertical: `${isMobile ? 'top' : "bottom"}`, horizontal: 'center' }}
                            transformOrigin={{ vertical: `${isMobile ? 'bottom' : "top"}`, horizontal: 'center' }}
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
                                navigate("account/resources/new-resource");
                            }}
                            >
                                Add resource
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
                </>}
                {isMobile && !isLoggedIn && <span className={classes.mobileFiller} />}
                <li className={classes.navElement}>
                    <button
                        className={classes.accountBtn}
                        onClick={() => {
                            isLoggedIn ?
                                (isMobile ? handleClickMenu() : navigate("/fiber-friend/account")) :
                                navigate("/fiber-friend/login")
                        }}
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