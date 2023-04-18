import CircularProgress from "@mui/material/CircularProgress";
import { Suspense } from "react";
import { useRouteLoaderData, Await, json, defer } from "react-router-dom";
import Tiles from "../../components/Tiles";
import classes from './Projects.module.scss'

function Projects() {

    const { projects }: any = useRouteLoaderData("projects");

    return (
        <div className={classes.container}>
            <h1 className={classes.header}>PROJECTS</h1>
            <Suspense fallback={<p style={{ textAlign: 'center' }}><CircularProgress /></p>}>
                <Await resolve={projects}>
                    {(loadedProjects) => <Tiles data={loadedProjects} link='new-project'  addText='New project'/>}
                </Await>
            </Suspense>
        </div>
    );
}

export default Projects;

async function loadProjects() {
    const response = await fetch('https://fiber-frined-default-rtdb.europe-west1.firebasedatabase.app/projects.json');

    if (!response.ok) {
        // return { isError: true, message: 'Could not fetch events.' };
        // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
        //   status: 500,
        // });
        throw json(
            { message: 'Could not fetch projects.' },
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
        projects: loadProjects(),
    });
}