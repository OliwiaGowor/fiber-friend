import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import classes from './PageNotFound.module.scss';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { useTranslation } from 'react-i18next';

const PageNotFound = () => {
    const { t } = useTranslation("PageNotFound");
    const navigate = useNavigate();

    return (
        <>
            <Navbar />
            <div className={classes.container}>
                <div className={classes.background}>
                    <div className={classes.textContainer}>
                        <h1 className={classes.firstHeader}>404</h1>
                        <h1 className={classes.secondHeader}>{t('header')}</h1>
                        <p className={classes.text}>
                            {t('message')}
                        </p>
                    </div>
                    <div className={classes.buttons}>
                        <Button
                            variant="contained"
                            className={classes.button}
                            onClick={() => navigate(-1)}
                        >
                            {t('returnBack')}
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.button}
                            onClick={() => navigate('/fiber-friend/report-problem')}
                        >
                            {t('reportProblem')}
                        </Button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default PageNotFound;