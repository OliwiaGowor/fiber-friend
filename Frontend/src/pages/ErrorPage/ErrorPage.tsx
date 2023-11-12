import classes from './ErrorPage.module.scss';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
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
                        onClick={() => navigate('report-problem')}
                        aria-label="Report problem"
                    >
                        Report problem
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ErrorPage;