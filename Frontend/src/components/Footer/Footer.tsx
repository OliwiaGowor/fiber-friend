import { Link } from 'react-router-dom';
import logoPicture from '../../photos/yarn-ball.png';
import { EmailIcon, FacebookIcon } from '../../svg/MediaIcons';
import classes from './Footer.module.scss';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation("Footer");
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
                        <h2 className={classes.sectionHeader}>{t('usefulLinks')}</h2>
                        <ul>
                            <li>{t('about')}</li>
                            <li>
                                <Link to={"account"}>
                                    {t('yourAccount')}
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className={classes.section}>
                        <h2 className={classes.sectionHeader}>{t('contact')}</h2>
                        <ul>
                            {/*<li>
                            <span className={classes.elementIcon}>{EmailIcon()}</span>
                            fiber-friend@gmail.com
                        </li>*/}
                            <li>
                                <Link to={"/contact"}>
                                    {t('contactUs')}
                                </Link>
                            </li>
                            <li>
                                <Link to={"/report-problem"}>
                                    {t('reportProblem')}
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
