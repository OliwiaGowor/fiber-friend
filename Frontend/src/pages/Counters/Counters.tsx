import CircularProgress from "@mui/material/CircularProgress";
import { Suspense } from "react";
import { useRouteLoaderData, Await, json, defer, useNavigate } from "react-router-dom";
import Tiles from "../../components/Tiles/Tiles";
import classes from './Counters.module.scss'
import { tokenLoader } from "../../utils/auth";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAppDispatch } from '../../utils/hooks';
import { handleRequest } from "../../utils/handleRequestHelper";
import { setError } from "../../reducers/errorSlice";

function Counters() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width: 800px)');

    const fetchCounters = async () => {
        try {
            const data = await handleRequest(
                `${process.env.REACT_APP_API_URL}CounterGroup${process.env.REACT_APP_ENV === "dev" ? "" : ".json"}`,
                "GET",
                "Could not fetch counters. Please try again later.",
                tokenLoader(),
            );
            return data;
        } catch (error) {
            dispatch(setError(error));
            return;
        }
    };

    return (
        <>
            {isMobile &&
                <div className={classes.backButton} onClick={() => navigate("/fiber-friend/account")}>
                    <ArrowBackIcon sx={{ fontSize: 35 }} />
                </div>
            }
            <div className={classes.container}>
                <h1 className={classes.header}>COUNTERS</h1>
                <Tiles
                    key="counters-tiles"
                    link='new-counter'
                    addText='New counter'
                    fetchData={fetchCounters}
                    addTile={true}

                />
            </div>
        </>
    );
}

export default Counters;
