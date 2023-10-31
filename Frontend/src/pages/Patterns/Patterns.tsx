import CircularProgress from "@mui/material/CircularProgress";
import { Suspense } from "react";
import { useLoaderData, Await, json, defer, useRouteLoaderData } from "react-router-dom";
import Tiles from "../../components/Tiles/Tiles";
import classes from './Patterns.module.scss'

export default function Patterns() {
    const { patterns }: any = useRouteLoaderData("patterns");

    return (
        <div className={classes.container}>
            <h1 className={classes.header}>PATTERNS</h1>
            <Suspense fallback={<p style={{ textAlign: 'center' }}><CircularProgress /></p>}>
                <Await resolve={patterns}>
                    {(loadedPatterns) => <Tiles data={loadedPatterns} link='new-pattern'  addText='New pattern'/>}
                </Await>
            </Suspense>
        </div>
    );
}

async function loadPatterns() {
    const response = await fetch('https://fiber-frined-default-rtdb.europe-west1.firebasedatabase.app/patterns.json');

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
}

export async function loader() {
    return defer({
        patterns: loadPatterns(),
    });
}