import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import landingPhoto from '../../photos/pexels-miriam-alonso-75852911.jpg'
import { Wave } from '../../svg/Wave';
import classes from './HomePage.module.scss';

function HomePage() {
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
                    <h1 className={classes.landingHeader}>Organize your knitting projects with ease </h1>
                    <p className={classes.landingText}> Stay on top of your progress and track details.
                        Perfect for beginners and pros alike. Try it now and take your knitting to the next level!</p>
                    <Button
                        variant="contained"
                        className={classes.landingButton}
                        onClick={() => navigate('login')}
                    >
                        TRY NOW!
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default HomePage;