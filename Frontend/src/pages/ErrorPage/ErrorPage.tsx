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
    );
}

export default ErrorPage;