import * as React from 'react';
import { Link, useNavigate } from "react-router-dom";
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
import logoPicture from '../../photos/yarn-ball-pink.png';
import { EmailIcon, FacebookIcon } from '../../svg/MediaIcons';

function SidebarAccount({ open, getOpen }: any) {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = React.useState<boolean>(true);
    const isMobile = useMediaQuery('(max-width: 800px)');

    React.useEffect(() => {
        setIsOpen(open);
    }, [open]);

    const handleClickAway = () => {
        if (isOpen && isMobile) {
            setIsOpen(false);
            getOpen(false)
        }
    };

    const handleClick = (link: string) => {
        if (isMobile) {
            setIsOpen(false);
            getOpen((prev: boolean) => !prev);
        }
        navigate(link);
    }

    return (
        <ClickAwayListener onClickAway={handleClickAway} touchEvent={'onTouchStart'}>
            <aside className={isOpen ? `${classes.sidebarAccount}` : `${classes.sidebarAccountHidden}`}>
                {isMobile &&
                        <Link to={"/fiber-friend"} className={classes.logo}>
                            <img
                                className={classes.logoPicture}
                                src={logoPicture}
                                alt="Fiber Friend Logo"
                                width='45px'
                                height='45px'
                            />
                            {'Fiber Friend'}
                        </Link>
                }
                <h2 className={classes.header} onClick={() => handleClick('/fiber-friend/account')}>
                    <AccountCircleIcon />
                    <div className={classes.text}>My account</div>
                </h2>
                <ul className={classes.elements}>
                    <li className={classes.element} onClick={() => handleClick('/fiber-friend/account/projects')}>
                        <GridOnIcon />
                        <div className={classes.text}>Projects</div>
                    </li>
                    <li className={classes.element} onClick={() => handleClick('/fiber-friend/account/patterns')}>
                        <BrushIcon />
                        <div className={classes.text}>Patterns</div>
                    </li>
                    <li className={classes.element} onClick={() => handleClick('/fiber-friend/account/counters')}>
                        <CalculateIcon />
                        <div className={classes.text}>Counters</div>
                    </li>
                    <li className={classes.element} onClick={() => handleClick('/fiber-friend/account/resources')}>
                        <ShoppingBasketIcon />
                        <div className={classes.text}>Resources</div>
                    </li>
                    <li className={classes.element} onClick={() => handleClick('statistics')}>
                        <InsightsIcon />
                        <div className={classes.text}>Statistics</div>
                    </li>
                    <span className={classes.divider} />
                    <li className={classes.element} onClick={() => handleClick('/fiber-friend/account/settings')}>
                        <SettingsIcon />
                        <div className={classes.text}>Settings</div>
                    </li>
                </ul>
                {isMobile && 
                <div className={classes.bottom}>
                    <div className={classes.mediaIcons}>
                        <span className={`${classes.mediaIcon} ${classes.facebook}`}>
                            {FacebookIcon()}
                        </span>
                        <span className={classes.mediaIcon}>
                            {EmailIcon()}
                        </span>
                    </div>
                    <p>© 2023 Fiber Friend</p>
                </div>
                }
            </aside>
        </ClickAwayListener>
    );
}

export default SidebarAccount;