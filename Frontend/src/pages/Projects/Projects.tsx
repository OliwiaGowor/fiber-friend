import { useState } from "react";
import { json, useNavigate } from "react-router-dom";
import Tiles from "../../components/Tiles/Tiles";
import classes from './Projects.module.scss'
import FiltersBar from "../../components/FiltersBar/FiltersBar";
import { projectsFilters } from "../../data/FiltersBarData";
import { tokenLoader } from "../../utils/auth";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAppDispatch } from "../../utils/hooks";
import { setError } from "../../reducers/errorSlice";
import { handleRequest } from "../../utils/handleRequestHelper";

function Projects() {
    const dispatch = useAppDispatch();
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width: 800px)');

    const fetchProjects = async (filters: string, page: number, pageSize: number ) => {
        try {
            const data = await handleRequest(
                process.env.REACT_APP_API_URL === "prod" ? `${process.env.REACT_APP_API_URL}Project${process.env.REACT_APP_ENV === "dev" ? "" : ".json"}` :
                `${process.env.REACT_APP_API_URL}Project/GetProjectsForUser/${localStorage.getItem("userId")}?${filters ? "filters=" + filters + "&" : ""}page=${page}&pageSize=${pageSize}`,
                "GET",
                "Could not fetch projects. Please try again later.",
                tokenLoader(),
            );
            return data;
        } catch (error) {
            dispatch(setError(error));
            return;
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
                <h1 className={classes.header}>PROJECTS</h1>
                <Tiles
                    link='new-project'
                    addText='New project'
                    fetchData={fetchProjects}
                    addTile={true}
                    filters={projectsFilters}
                />
            </div>
        </>
    );
}

export default Projects;