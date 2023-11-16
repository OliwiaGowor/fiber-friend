import CircularProgress from "@mui/material/CircularProgress";
import { Suspense } from "react";
import { useRouteLoaderData, Await, json, defer } from "react-router-dom";
import Tiles from "../../components/Tiles/Tiles";
import classes from './Resources.module.scss'

export default function Resources() {
    const { resources }: any = useRouteLoaderData("resources");

    return (
        <div className={classes.container}>
            <h1 className={classes.header}>SUPPLIES</h1>
            <Suspense fallback={<p style={{ textAlign: 'center' }}><CircularProgress /></p>}>
                <Await resolve={resources}>
                    {(loadedProjects) => <Tiles data={loadedProjects} link='new-resource'  addText='New resource'/>}
                </Await>
            </Suspense>
        </div>
    );
}

async function loadResources() {
    const response = await fetch(`${process.env.REACT_APP_API_URL}Resource${process.env.REACT_APP_ENV === "dev" ? "" : ".json"}`);

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
}

export async function loader() {
    return defer({
        resources: loadResources(),
    });
}