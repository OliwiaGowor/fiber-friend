import { Link } from 'react-router-dom';
import logoPicture from '../../photos/yarn-ball.png';
import classes from './Footer.module.scss';
import useMediaQuery from '@mui/material/useMediaQuery';
import { EmailIcon, FacebookIcon } from '../../svg/MediaIcons';

const Footer = () => {
    const smallerLogo = useMediaQuery('(max-width: 560px)');

    return (
        <footer className={classes.footer}>
            <div className={classes.main}>
                <div className={classes.section}>
                    <div className={classes.logo}>
                        <img className={classes.logoPicture} src={logoPicture} width='45px' height='45px' />
                        {!smallerLogo && <h1 className={classes.logoText}>Fiber Friend</h1>}
                    </div>
                    <div className={classes.mediaIcons}>
                        <span className={`${classes.mediaIcon} ${classes.facebook}`}>
                            {FacebookIcon()}
                        </span>
                        <span className={classes.mediaIcon}>
                            {EmailIcon()}
                        </span>
                    </div>
                </div>
                <div className={classes.section}>
                    <h2 className={classes.sectionHeader}>Useful links</h2>
                    <ul>
                        <li>About</li>
                        <li>
                            <Link to={"/account"}>
                                Your account
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={classes.section}>
                    <h2 className={classes.sectionHeader}>Contact</h2>
                    <ul>
                        {/*<li>
                            <span className={classes.elementIcon}>{EmailIcon()}</span>
                            fiber-friend@gmail.com
                        </li>*/}
                        <li>
                            <Link to={"/contact"}>
                                Contact us
                            </Link>
                        </li>
                        <li>
                            <Link to={"/report-problem"}>
                                Report problem
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={classes.bottom}>
                <p>© 2023 Fiber Friend</p>
            </div>
        </footer>
    );
};

export default Footer;
