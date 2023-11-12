import CircularProgress from "@mui/material/CircularProgress";
import { Suspense } from "react";
import { useRouteLoaderData, Await, json, defer } from "react-router-dom";
import Tiles from "../../components/Tiles/Tiles";
import classes from './Counters.module.scss'

function Counters() {

    const { counters }: any = useRouteLoaderData("counters");

    return (
        <div className={classes.container}>
            <h1 className={classes.header}>COUNTERS</h1>
            <Suspense fallback={<p style={{ textAlign: 'center' }}><CircularProgress /></p>}>
                <Await resolve={counters}>
                    {(loadedCounters) =>
                        <Tiles
                            key="counters-tiles"
                            data={loadedCounters}
                            link='new-counter'
                            addText='New counter'
                        />}
                </Await>
            </Suspense>
        </div>
    );
}

export default Counters;

async function loadCounters() {
    const response = await fetch('https://fiber-frined-default-rtdb.europe-west1.firebasedatabase.app/counterGroups.json');

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
}

export async function loader() {
    return defer({
        counters: loadCounters(),
    });
}