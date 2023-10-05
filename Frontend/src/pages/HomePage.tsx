import classes from './HomePage.module.scss';
import landingPhoto from '../photos/pexels-miriam-alonso-75852911.jpg'
import waves from '../photos/wave(2).svg';
import { ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import {theme} from '../components/MUITheme'
import { Link } from 'react-router-dom';

function HomePage () {
    return (
        <div className={classes.container}>
            <div className={classes.landingPage}>
                <img className={classes.waves} src={waves} />
                <img className={classes.landingPhoto} src={landingPhoto}/>
                <div className={classes.landingTextContainer}>
                    <h1 className={classes.landingHeader}>Organize your knitting projects with ease </h1>
                    <p className={classes.landingText}> Stay on top of your progress and track details. 
                    Perfect for beginners and pros alike. Try it now and take your knitting to the next level!</p>
                    <Link to='login'><Button variant="contained" className={classes.landingButton} >TRY NOW!</Button></Link>
                </div>
            </div>
        </div>
    );
}

export default HomePage;