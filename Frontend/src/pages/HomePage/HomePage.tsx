import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import landingPhoto from '../../photos/pexels-miriam-alonso-75852911.jpg'
import { Wave } from '../../svg/Wave';
import classes from './HomePage.module.scss';
import { useTranslation } from 'react-i18next';

function HomePage() {
    const { t } = useTranslation("HomePage");
    const navigate = useNavigate();

    return (
        <div className={classes.container}>
            <div className={classes.landingPage}>
                <div className={classes.waves}>{Wave()}</div>
                <img
                    className={classes.landingPhoto}
                    src={landingPhoto}
                    alt="Knitting project"
                />
                <div className={classes.landingTextContainer}>
                    <h1 className={classes.landingHeader}>{t('landingHeader')}</h1>
                    <p className={classes.landingText}> {t('landingText')}</p>
                    <Button
                        variant="contained"
                        className={classes.landingButton}
                        onClick={() => navigate('login')}
                    >
                        {t('landingButtonText')}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default HomePage;