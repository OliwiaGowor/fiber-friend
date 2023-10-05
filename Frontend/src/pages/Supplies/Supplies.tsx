import CircularProgress from "@mui/material/CircularProgress";
import { Suspense } from "react";
import { useRouteLoaderData, Await, json, defer } from "react-router-dom";
import Tiles from "../../components/Tiles";
import classes from './Supplies.module.scss'

export default function Supplies() {
    const { supplies }: any = useRouteLoaderData("supplies");

    return (
        <div className={classes.container}>
            <h1 className={classes.header}>SUPPLIES</h1>
            <Suspense fallback={<p style={{ textAlign: 'center' }}><CircularProgress /></p>}>
                <Await resolve={supplies}>
                    {(loadedProjects) => <Tiles data={loadedProjects} link='new-supply'  addText='New supply'/>}
                </Await>
            </Suspense>
        </div>
    );
}

async function loadSupplies() {
    const response = await fetch('https://fiber-frined-default-rtdb.europe-west1.firebasedatabase.app/supplies.json');

    if (!response.ok) {
        // return { isError: true, message: 'Could not fetch events.' };
        // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
        //   status: 500,
        // });
        throw json(
            { message: 'Could not fetch supplies.' },
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
        supplies: loadSupplies(),
    });
}