import { Link } from 'react-router-dom';
import logoPicture from '../../photos/yarn-ball.png';
import { EmailIcon, FacebookIcon } from '../../svg/MediaIcons';
import classes from './Footer.module.scss';

const Footer = () => {
    return (
        <footer className={classes.footer}>
            <div className={classes.main}>
                <div className={classes.logoAndMedia}>
                    <div className={classes.logo}>
                        <img className={classes.logoPicture} src={logoPicture} width='45px' height='45px' alt='Logo' />
                        <h1 className={classes.logoText}>Fiber Friend</h1>
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
                <div className={classes.links}>
                    <div className={classes.section}>
                        <h2 className={classes.sectionHeader}>Useful links</h2>
                        <ul>
                            <li>About</li>
                            <li>
                                <Link to={"account"}>
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
            </div>
            <div className={classes.bottom}>
                <p>© 2023 Fiber Friend</p>
            </div>
        </footer>
    );
};

export default Footer;
