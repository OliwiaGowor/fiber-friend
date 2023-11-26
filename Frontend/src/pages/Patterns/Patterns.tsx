import { Suspense } from "react";
import { Await, json, defer, useRouteLoaderData } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Tiles from "../../components/Tiles/Tiles";
import classes from './Patterns.module.scss'
import { tokenLoader } from "../../utils/auth";

export default function Patterns() {
    const fetchPatterns = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}Pattern${process.env.REACT_APP_ENV === "dev" ? "" : ".json"}`, {
            headers: {
                'Content-Type': 'application/json',
                //Authorization: "Bearer " + tokenLoader(),
            },
        });

        if (!response.ok) {
            throw json(
                { message: 'Could not fetch patterns.' },
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
        <div className={classes.container}>
            <h1 className={classes.header}>PATTERNS</h1>
            <Tiles link='new-pattern' addText='New pattern' fetchData={fetchPatterns} addTile={true} />
        </div>
    );
}