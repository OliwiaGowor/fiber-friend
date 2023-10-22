import CircularProgress from "@mui/material/CircularProgress";
import { Suspense } from "react";
import { useRouteLoaderData, Await, json, defer } from "react-router-dom";
import Tiles from "../../components/Tiles/Tiles";
import classes from './Projects.module.scss'
import ErrorPopup from "../../components/ErrorPopup/ErrorPopup";

function Projects() {
    const { projects }: any = useRouteLoaderData("projects");
    console.log(projects);
    return (
        <div className={classes.container}>
            <h1 className={classes.header}>PROJECTS</h1>
            <Suspense fallback={<p style={{ textAlign: 'center' }}><CircularProgress /></p>}>
                <Await resolve={projects}>
                    {(loadedProjects) => {
                        if (loadedProjects?.status === 500)
                            return <>
                                <ErrorPopup message={loadedProjects.message} />
                                <Tiles data={null} link='new-project' addText='New project' />
                            </>
                        return <Tiles data={loadedProjects} link='new-project' addText='New project' />
                    }}

                </Await>
            </Suspense>
        </div>
    );
}

export default Projects;

async function loadProjects() {
    const response = await fetch('https://fiber-frined-default-rtdb.europe-west1.firebasedatabase.app/projects.json');

    if (!response.ok) {
        return json(
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