import CircularProgress from "@mui/material/CircularProgress";
import classes from "./PatternsStatistics.module.scss";
import { Suspense, useEffect, useState } from "react";
import { Await } from "react-router";
import { PieChart } from '@mui/x-charts/PieChart';

const tmpData = {
    totalPatterns: 40,
    finishedPatterns: 30,
    skeinsUsed: 100,
    mostUsedTool: "3mm",
    mostUsedStitch: "single crochet",
    mostCommonCategory: "top",
    typeOfPatterns: [
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

interface PatternsStatisticsDto {
    totalPatterns: string;
    finishedPatterns: string;
    mostUsedTool: string;
    mostUsedStitch: string;
    mostCommonCategory: string;
    typeOfPatterns: {
        id: number;
        value: number;
        label: string;
    }[];
}

const PatternsStatistics = () => {
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
        setData(data);
    };

    /*useEffect(() => {
        fetchStatistics();
    }, []);*/

    return (
        <div className={classes.container}>
            <div className={classes.info}>The statistics are for your authorial patterns.</div>
            <div className={classes.tiles}>
                <Suspense fallback={<p style={{ textAlign: 'center' }}><CircularProgress /></p>}>
                    <Await resolve={null}>
                        <div className={classes.dataTile}>
                            <p className={classes.dataTileHeader}>Number of added patterns</p>
                            <p className={classes.dataTileData}>{data?.totalPatterns}</p>
                        </div>
                        <div className={classes.dataTile}>
                            <p className={classes.dataTileHeader}>Number of finished patterns</p>
                            <p className={classes.dataTileData}>{data?.finishedPatterns}</p>
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
                            <p className={classes.dataTileHeader}>Type of patterns</p>
                            <PieChart
                                series={[
                                    {
                                        data: data?.typeOfPatterns ?? [],
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
        </div>
    );
}

export default PatternsStatistics;
