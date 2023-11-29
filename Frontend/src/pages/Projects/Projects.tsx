import { useState } from "react";
import {  json, useNavigate } from "react-router-dom";
import Tiles from "../../components/Tiles/Tiles";
import classes from './Projects.module.scss'
import FiltersBar from "../../components/FiltersBar/FiltersBar";
import { projectsFilters } from "../../data/FiltersBarData";
import { tokenLoader } from "../../utils/auth";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useMediaQuery from "@mui/material/useMediaQuery";

function Projects() {
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width: 800px)');

    const fetchProjects = async (page: number, pageSize: number, filters: object[]) => {
        //`${process.env.REACT_APP_API_URL}Pattern/GetPatternsForUser/${userId}/${filters}/page=${page}/pageSize=${pageSize}`
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}Project${process.env.REACT_APP_ENV === "dev" ? "" : ".json"}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    //Authorization: "Bearer " + tokenLoader(),
                },
            });

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