import CircularProgress from "@mui/material/CircularProgress";
import { Suspense } from "react";
import { useRouteLoaderData, Await, json, defer } from "react-router-dom";
import Tiles from "../../components/Tiles/Tiles";
import classes from './Projects.module.scss'
import FiltersBar from "../../components/FiltersBar/FiltersBar";
import { projectsFilters } from "../../data/FiltersBarData";

function Projects() {
    const { projects }: any = useRouteLoaderData("projects");

    return (
        <div className={classes.container}>
            <h1 className={classes.header}>PROJECTS</h1>
            <FiltersBar filters={projectsFilters} />
            <Suspense fallback={<p style={{ textAlign: 'center' }}><CircularProgress /></p>}>
                <Await resolve={projects}>
                    {(loadedProjects) => {
                        if (loadedProjects?.status === 500 )
                            return <>
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
    try {
        const response = await fetch('https://fiber-frined-default-rtdb.europe-west1.firebasedatabase.app/projects.json');

        if (!response.ok) {
            localStorage.setItem("error", "Could not fetch projects.");

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
    } catch (error) {
        localStorage.setItem("error", "Could not fetch projects.");

        return json(
            { message: 'Could not fetch projects.' },
            {
                status: 500,
            }
        );
    }
}

export async function loader() {
    return defer({
        projects: loadProjects(),
    });
}