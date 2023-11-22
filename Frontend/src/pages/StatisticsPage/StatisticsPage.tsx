import { Suspense, useState } from "react";
import { Await, defer, json } from "react-router-dom";
import classes from './StatisticsPage.module.scss'
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { MenuItem, Select } from "@mui/material";
import { getAuthToken } from "../../utils/auth";
import ProjectsStatistics from "../../components/ProjectsStatistics/ProjectsStatistics";
import PatternsStatistics from "../../components/PatternsStatistics/PatternsStatistics";

const statisticsTypes = [
    "patterns", "projects"
]

export default function StatisticsPage() {
    const today = new Date();
    const [type, setType] = useState(statisticsTypes[0]);
    const [timePeriod, setTimePeriod] = useState("monthly");

    const handleDateChange = async (date: Dayjs | string) => {
        //format to month and/or year
        let url = '';

        const response = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer" + getAuthToken(),
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
    };

    const handleRenderStatistics = () => {
        switch (type) {
            case "patterns":
                return (
                    <PatternsStatistics />
                );
            case "projects":
                return (
                    <ProjectsStatistics />
                );
        }
    };

    return (
        <div className={classes.container}>
            <h1 className={classes.header}>
                STATISTICS
            </h1>
            <div className={classes.splitContainer}>
                <div className={classes.leftContainer}>
                    {handleRenderStatistics()}
                </div>
                <div className={classes.rightContainer}>
                    <h2>Choose statistics type</h2>
                    <Select
                        id="type-select"
                        value={type}
                        label="Period"
                        onChange={(event) => {
                            setType(event.target.value as string);
                        }}
                        className={classes.typeSelect}
                    >
                        {statisticsTypes.map((type) => (
                            <MenuItem value={type}>{type}</MenuItem>
                        ))}
                    </Select>
                    <h2>Choose time peroid</h2>
                    <Select
                        id="time-period-select"
                        value={timePeriod}
                        label="Period"
                        onChange={(event) => {
                            setTimePeriod(event.target.value as string);
                            if (event.target.value === "all") handleDateChange("all");
                        }}
                        className={classes.timePeriodSelect}
                    >
                        <MenuItem value={"monthly"}>monthly</MenuItem>
                        <MenuItem value={"yearly"}>yearly</MenuItem>
                        <MenuItem value={"all"}>all</MenuItem>
                    </Select>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        {timePeriod === "monthly" &&
                            <DateCalendar
                                className={classes.calendar}
                                defaultValue={dayjs(today)}
                                views={['month', 'year']}
                                openTo="month"
                                onMonthChange={handleDateChange}
                            />}
                        {timePeriod === "yearly" &&
                            <DateCalendar
                                className={classes.calendar}
                                defaultValue={dayjs(today)}
                                views={['year']}
                                openTo="year"
                                onYearChange={handleDateChange}
                            />}
                        {timePeriod === "all" &&
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
    const response = await fetch('', {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer" + getAuthToken(),
        },

    });

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