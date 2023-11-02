import { Suspense, useState } from "react";
import { Await, defer, json } from "react-router-dom";
import classes from './StatisticsPage.module.scss'
import CircularProgress from "@mui/material/CircularProgress";
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { MenuItem, Select } from "@mui/material";
import { PieChart } from '@mui/x-charts/PieChart';

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

export default function StatisticsPage() {
    const today = new Date();
    const [type, setType] = useState('monthly');

    const handleDateChange = async (date: Dayjs | string) => {
        //format to month and/or year
        let url = '';

        const response = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(date),
        });

        if (response.status === 422) {
            return response;
        }

        if (!response.ok) {
            throw json({ message: 'Could not save project.' }, { status: 500 });
        }
        const data = await response.json();
    }

    return (
        <div className={classes.container}>
            <h1 className={classes.header}>
                STATISTICS
            </h1>
            <div className={classes.splitContainer}>
                <div className={classes.leftContainer}>
                    <Suspense fallback={<p style={{ textAlign: 'center' }}><CircularProgress /></p>}>
                        <Await resolve={null}>
                            <div className={classes.dataTile}>
                                <p className={classes.dataTileHeader}>Number of {type === "all" ? "all" : "active"} projects</p>
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
                <div className={classes.rightContainer}>
                    <h2>Choose time peroid</h2>
                    <Select
                        id="type-select"
                        value={type}
                        label="Period"
                        onChange={(event) => {
                            setType(event.target.value as string);
                            if (event.target.value === "all") handleDateChange("all");
                        }}
                        className={classes.typeSelect}
                    >
                        <MenuItem value={"monthly"}>monthly</MenuItem>
                        <MenuItem value={"yearly"}>yearly</MenuItem>
                        <MenuItem value={"all"}>all</MenuItem>
                    </Select>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        {type === "monthly" &&
                            <DateCalendar
                                className={classes.calendar}
                                defaultValue={dayjs(today)}
                                views={['month', 'year']}
                                openTo="month"
                                onMonthChange={handleDateChange}
                            />}
                        {type === "yearly" &&
                            <DateCalendar
                                className={classes.calendar}
                                defaultValue={dayjs(today)}
                                views={['year']}
                                openTo="year"
                                onYearChange={handleDateChange}
                            />}
                        {type === "all" &&
                            <DateCalendar
                                className={classes.calendar}
                                defaultValue={dayjs(today)}
                                views={['month', 'year']}
                                openTo="month"
                                disabled
                            />}
                    </LocalizationProvider>
                </div>
            </div>
        </div>
    );
}

async function loadStatistics() {
    const response = await fetch('');

    if (!response.ok) {
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
    const statistics = await Promise.all([
        loadStatistics()
    ]);

    return defer({
        statistics,
    });
}