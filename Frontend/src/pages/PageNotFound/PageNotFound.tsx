import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import classes from './PageNotFound.module.scss';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <>
            <Navbar />
            <div className={classes.container}>
                <div className={classes.background}>
                    <div className={classes.textContainer}>
                        <h1 className={classes.firstHeader}>404</h1>
                        <h1 className={classes.secondHeader}>Ops! Page not found</h1>
                        <p className={classes.text}>
                            Sorry the page you're looking for doesn't exist.
                            If you think something is broken, report a problem.
                        </p>
                    </div>
                    <div className={classes.buttons}>
                        <Button
                            variant="contained"
                            className={classes.button}
                            onClick={() => navigate(-1)}
                        >
                            Return back
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.button}
                            onClick={() => navigate('report-problem')}
                        >
                            Report problem
                        </Button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default PageNotFound;