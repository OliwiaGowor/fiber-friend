import CircularProgress from "@mui/material/CircularProgress";
import classes from "./PatternsStatistics.module.scss";
import { Suspense, useEffect, useState } from "react";
import { Await } from "react-router";
import { PieChart } from '@mui/x-charts/PieChart';
import { handleRequest } from "../../utils/handleRequestHelper";
import { tokenLoader } from "../../utils/auth";
import { useAppDispatch } from "../../utils/hooks";
import { setError } from "../../reducers/errorSlice";
import { useTranslation } from "react-i18next";

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
    timePeriodStart: string;
    timePeriodEnd: string;
}

const PatternsStatistics = ({ timePeriodStart, timePeriodEnd }: PatternsStatisticsDto) => {
    const { t } = useTranslation("PatternsStatistics");
    const dispatch = useAppDispatch();
    const [data, setData] = useState<any | null>(tmpData);

    const fetchStatistics = async () => {
        try {
            const response = await handleRequest(
                `${process.env.REACT_APP_API_URL}Statistics/PatternsStatistics/${localStorage.getItem("userId")}/${timePeriodStart}/${timePeriodEnd}`,
                'GET',
                t("couldNotFetchStatistics"),
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
            <div className={classes.info}>{t("statisticsForAuthorialPatterns")}</div>
            <div className={classes.tiles}>
                <Suspense fallback={<p style={{ textAlign: 'center' }}><CircularProgress /></p>}>
                    <Await resolve={null}>
                        <div className={classes.dataTile}>
                            <p className={classes.dataTileHeader}>{t("addedPatterns")}</p>
                            <p className={classes.dataTileData}>{data?.addedPatterns}</p>
                        </div>
                        <div className={classes.dataTile}>
                            <p className={classes.dataTileHeader}>{t("finishedPatterns")}</p>
                            <p className={classes.dataTileData}>{data?.authorialPatterns}</p>
                        </div>
                        <div className={classes.dataTile}>
                            <p className={classes.dataTileHeader}>{t("mostFreqToolSize")}</p>
                            <p className={classes.dataTileData}>{data?.mostFreqToolSize}</p>
                        </div>
                        <div className={classes.dataTile}>
                            <p className={classes.dataTileHeader}>{t("mostFreqStitch")}</p>
                            <p className={classes.dataTileData}>{data?.mostFreqStitch}</p>
                        </div>
                        <div className={classes.dataTile}>
                            <p className={classes.dataTileHeader}>{t("mostFreqCategory")}</p>
                            <p className={classes.dataTileData}>{data?.mostFreqCategory}</p>
                        </div>
                        <div className={`${classes.dataTile} ${classes.chart}`}>
                            <p className={classes.dataTileHeader}>{t("typeOfPatterns")}</p>
                            <PieChart
                                series={[
                                    {
                                        data: [
                                            {
                                                id: 0,
                                                value: data.crochetPatterns,
                                                label: t("crochet"),
                                            },
                                            {
                                                id: 1,
                                                value: data.knitingPatterns,
                                                label: t("knit"),
                                            },
                                            {
                                                id: 2,
                                                value: data.otherPatterns,
                                                label: t("other"),
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
        </div>
    );
}

export default PatternsStatistics;
