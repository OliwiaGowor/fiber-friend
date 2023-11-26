import CircularProgress from "@mui/material/CircularProgress";
import { Suspense } from "react";
import { useRouteLoaderData, Await, json, defer } from "react-router-dom";
import Tiles from "../../components/Tiles/Tiles";
import classes from './Resources.module.scss'
import { tokenLoader } from "../../utils/auth";

export default function Resources() {
    const fetchResources = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}Resource${process.env.REACT_APP_ENV === "dev" ? "" : ".json"}`, {
            headers: {
                'Content-Type': 'application/json',
                //Authorization: "Bearer " + tokenLoader(),
            },
        });

        if (!response.ok) {
            // return { isError: true, message: 'Could not fetch events.' };
            // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
            //   status: 500,
            // });
            throw json(
                { message: 'Could not fetch resources.' },
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
            <h1 className={classes.header}>RESOURCES</h1>
            <Tiles link='new-resource' addText='New resource' fetchData={fetchResources} addTile={true} />
        </div>
    );
}
