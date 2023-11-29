import CircularProgress from "@mui/material/CircularProgress";
import { Suspense } from "react";
import { useRouteLoaderData, Await, json, defer, useNavigate } from "react-router-dom";
import Tiles from "../../components/Tiles/Tiles";
import classes from './Counters.module.scss'
import { tokenLoader } from "../../utils/auth";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useMediaQuery from "@mui/material/useMediaQuery";

function Counters() {
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width: 800px)');

    const fetchCounters = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}CounterGroup${process.env.REACT_APP_ENV === "dev" ? "" : ".json"}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + tokenLoader(),
            },
        });

        if (!response.ok) {
            // return { isError: true, message: 'Could not fetch events.' };
            // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
            //   status: 500,
            // });
            throw json(
                { message: 'Could not fetch counters.' },
                {
                    status: 500,
                }
            );
        } else {
            const resData = await response.json();

            return resData;
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
