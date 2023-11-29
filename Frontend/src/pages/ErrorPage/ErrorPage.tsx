import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import classes from './ErrorPage.module.scss';

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <>
            <Navbar />
            <div className={classes.container}>
                <div className={classes.background}>
                    <div className={classes.textContainer}>
                        <h1 className={classes.header}>Ops! Something went wrong</h1>
                        <p className={classes.text}>
                            Please try again later. If the problem persists you can report it to us!
                        </p>
                    </div>
                    <div className={classes.buttons}>
                        <Button
                            className={classes.button}
                            variant="contained"
                            onClick={() => navigate(-1)}
                            aria-label="Return back"
                        >
                            Return back
                        </Button>
                        <Button
                            className={classes.button}
                            variant="contained"
                            onClick={() => navigate('/fiber-friend/report-problem')}
                            aria-label="Report problem"
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

export default ErrorPage;