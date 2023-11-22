import classes from "./ProjectsStatistics.module.scss";
import { PieChart } from '@mui/x-charts/PieChart';
import { Suspense } from "react";
import { Await } from "react-router";
import CircularProgress from "@mui/material/CircularProgress";

const data = {
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

const ProjectsStatistics = () => {
    return (
        <div className={classes.container}>
            <Suspense fallback={<p style={{ textAlign: 'center' }}><CircularProgress /></p>}>
                <Await resolve={null}>
                    <div className={classes.dataTile}>
                        <p className={classes.dataTileHeader}>Number of added projects</p>
                        <p className={classes.dataTileData}>{data.totalProjects}</p>
                    </div>
                    <div className={classes.dataTile}>
                        <p className={classes.dataTileHeader}>Number of finished projects</p>
                        <p className={classes.dataTileData}>{data.finishedProjects}</p>
                    </div>
                    <div className={classes.dataTile}>
                        <p className={classes.dataTileHeader}>Skeins used</p>
                        <p className={classes.dataTileData}>{data.skeinsUsed}</p>
                    </div>
                    <div className={classes.dataTile}>
                        <p className={classes.dataTileHeader}>Most frequently used hook/needle size</p>
                        <p className={classes.dataTileData}>{data.mostUsedTool}</p>
                    </div>
                    <div className={classes.dataTile}>
                        <p className={classes.dataTileHeader}>Mostly used stitch</p>
                        <p className={classes.dataTileData}>{data.mostUsedStitch}</p>
                    </div>
                    <div className={classes.dataTile}>
                        <p className={classes.dataTileHeader}>Most common category</p>
                        <p className={classes.dataTileData}>{data.mostCommonCategory}</p>
                    </div>
                    <div className={`${classes.dataTile} ${classes.chart}`}>
                        <p className={classes.dataTileHeader}>Type of projects</p>
                        <PieChart
                            series={[
                                {
                                    data: data.typeOfProjects,
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