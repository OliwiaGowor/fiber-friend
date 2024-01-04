import classes from "./ProjectsStatistics.module.scss";
import { PieChart } from '@mui/x-charts/PieChart';
import { Suspense, useEffect, useState } from "react";
import { Await } from "react-router";
import CircularProgress from "@mui/material/CircularProgress";
import { handleRequest } from "../../utils/handleRequestHelper";
import { tokenLoader } from "../../utils/auth";
import { useAppDispatch } from "../../utils/hooks";
import { setError } from "../../reducers/errorSlice";

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
    timePeriodStart: string;
    timePeriodEnd: string;
}

const ProjectsStatistics = ({ timePeriodStart, timePeriodEnd }: ProjectsStatisticsDto) => {
    const dispatch = useAppDispatch();
    const [data, setData] = useState<any | null>(tmpData);

    const fetchStatistics = async () => {
        try {
            const response = await handleRequest(
                `${process.env.REACT_APP_API_URL}Statistics/ProjectStatistics/${localStorage.getItem("userId")}/${timePeriodStart}/${timePeriodEnd}`,
                'GET',
                "Could not fetch statistics",
                tokenLoader(),
            );
            setData(response);
        } catch (error) {
            dispatch(setError(error));
            return
        }
    };

    useEffect(() => {
        fetchStatistics();
    }, [timePeriodStart, timePeriodEnd]);

    return (
        <div className={classes.container}>
            <Suspense fallback={<p style={{ textAlign: 'center' }}><CircularProgress /></p>}>
                <Await resolve={null}>
                    <div className={classes.dataTile}>
                        <p className={classes.dataTileHeader}>Number of added projects</p>
                        <p className={classes.dataTileData}>{data?.activeProjects}</p>
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
                        <p className={classes.dataTileData}>{data?.mostFreqToolSize}</p>
                    </div>
                    <div className={classes.dataTile}>
                        <p className={classes.dataTileHeader}>Mostly used stitch</p>
                        <p className={classes.dataTileData}>{data?.mostFreqStitch}</p>
                    </div>
                    <div className={classes.dataTile}>
                        <p className={classes.dataTileHeader}>Most common category</p>
                        <p className={classes.dataTileData}>{data?.mostFreqCategory}</p>
                    </div>
                    <div className={`${classes.dataTile} ${classes.chart}`}>
                        <p className={classes.dataTileHeader}>Type of projects</p>
                        <PieChart
                            series={[
                                {
                                    data: [
                                        {
                                            id: 0,
                                            value: data.crochetProjects,
                                            label: "crochet",
                                        },
                                        {
                                            id: 1,
                                            value: data.knitingProjects,
                                            label: "knit",
                                        },
                                        {
                                            id: 2,
                                            value: data.otherProjects,
                                            label: "other",
                                        },
                                    ] ?? [],
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