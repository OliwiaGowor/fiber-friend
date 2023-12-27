import classes from "./ProjectsStatistics.module.scss";
import { PieChart } from '@mui/x-charts/PieChart';
import { Suspense, useState } from "react";
import { Await } from "react-router";
import CircularProgress from "@mui/material/CircularProgress";

const tmpData = {
    totalProjects: 40,
    finishedProjects: 30,
    skeinsUsed: 100,
    mostUsedTool: "3mm",
    mostUsedStitch: "single crochet",
    mostCommonCategory: "top",
    typeOfProjects: [
        {
            id: 0,
            value: 50,
            label: "crochet",
        },
        {
            id: 1,
            value: 50,
            label: "knit",
        }
    ]
};

interface ProjectsStatisticsDto {
    totalProjects: string;
    finishedProjects: string;
    skeinsUsed: string;
    mostUsedTool: string;
    mostUsedStitch: string;
    mostCommonCategory: string;
    typeOfProjects: {
        id: number;
        value: number;
        label: string;
    }[];
}

const ProjectsStatistics = () => {
    const [data, setData] = useState<any | null>(tmpData);
    
    const fetchStatistics = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}Resource${process.env.REACT_APP_ENV === "dev" ? "" : ".json"}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });
        const data = await response.json();
        return data;
    };
    
    return (
        <div className={classes.container}>
            <Suspense fallback={<p style={{ textAlign: 'center' }}><CircularProgress /></p>}>
                <Await resolve={null}>
                    <div className={classes.dataTile}>
                        <p className={classes.dataTileHeader}>Number of added projects</p>
                        <p className={classes.dataTileData}>{data?.totalProjects}</p>
                    </div>
                    <div className={classes.dataTile}>
                        <p className={classes.dataTileHeader}>Number of finished projects</p>
                        <p className={classes.dataTileData}>{data?.finishedProjects}</p>
                    </div>
                    <div className={classes.dataTile}>
                        <p className={classes.dataTileHeader}>Skeins used</p>
                        <p className={classes.dataTileData}>{data?.skeinsUsed}</p>
                    </div>
                    <div className={classes.dataTile}>
                        <p className={classes.dataTileHeader}>Most frequently used hook/needle size</p>
                        <p className={classes.dataTileData}>{data?.mostUsedTool}</p>
                    </div>
                    <div className={classes.dataTile}>
                        <p className={classes.dataTileHeader}>Mostly used stitch</p>
                        <p className={classes.dataTileData}>{data?.mostUsedStitch}</p>
                    </div>
                    <div className={classes.dataTile}>
                        <p className={classes.dataTileHeader}>Most common category</p>
                        <p className={classes.dataTileData}>{data?.mostCommonCategory}</p>
                    </div>
                    <div className={`${classes.dataTile} ${classes.chart}`}>
                        <p className={classes.dataTileHeader}>Type of projects</p>
                        <PieChart
                            series={[
                                {
                                    data: data?.typeOfProjects ?? [],
                                },
                            ]}
                            width={400}
                            height={200}
                            slotProps={{
                                legend: {
                                    direction: 'row',
                                    position: { vertical: 'bottom', horizontal: 'middle' },
                                    padding: 0,
                                },
                            }}
                            margin={{ bottom: 60 }}
                        />
                    </div>
                </Await>
            </Suspense>
        </div>
    );
}

export default ProjectsStatistics;