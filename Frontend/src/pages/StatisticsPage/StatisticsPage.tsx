import { useEffect, useState } from "react";
import { defer, json } from "react-router-dom";
import classes from './StatisticsPage.module.scss'
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { MenuItem, Select } from "@mui/material";
import { getAuthToken } from "../../utils/auth";
import ProjectsStatistics from "../../components/ProjectsStatistics/ProjectsStatistics";
import PatternsStatistics from "../../components/PatternsStatistics/PatternsStatistics";
import { useAppDispatch } from '../../utils/hooks';
import { handleRequest } from "../../utils/handleRequestHelper";
import { setError } from "../../reducers/errorSlice";
import { useTranslation } from "react-i18next";

const statisticsTypes = [
    "patterns", "projects"
]

export default function StatisticsPage() {
    const { t } = useTranslation("StatisticsPage");
    const today = new Date();
    const [type, setType] = useState(statisticsTypes[0]);
    const [timePeriod, setTimePeriod] = useState("monthly");

    const getTimePeriodEnd = (date: Date | string): string => {
        if (timePeriod === "monthly") {
            console.log((dayjs(date).endOf('month').toISOString().slice(0, 10)));
            return dayjs(date).endOf('month').toISOString().slice(0, 10);
        }
        else if (timePeriod === "yearly") {
            return dayjs(date).endOf('year').toISOString().slice(0, 10);
        }
        else if (timePeriod === "all") {
            return "9999-12-30";
        }
        else {
            return dayjs(date).toISOString().slice(0, 10);
        }
    };

    const getTimePeriodStart = (date: Date | string): string => {
        if (timePeriod === "monthly") {
            return dayjs(date).startOf('month').toISOString().slice(0, 10);
        }
        else if (timePeriod === "yearly") {
            return dayjs(date).startOf('year').toISOString().slice(0, 10);
        }
        else if (timePeriod === "all") {
            return "0001-01-1";
        }
        else {
            return dayjs(date).toISOString().slice(0, 10);
        }
    };

    const [timePeriodStart, setTimePeriodStart] = useState(getTimePeriodStart(today));
    const [timePeriodEnd, setTimePeriodEnd] = useState(getTimePeriodEnd(today));

    const handleDateChange = (date: Date | string) => {
        setTimePeriodStart(getTimePeriodStart(date));
        setTimePeriodEnd(getTimePeriodEnd(date));
    };

    const handleRenderStatistics = () => {
        switch (type) {
            case "patterns":
                return (
                    <PatternsStatistics timePeriodStart={timePeriodStart} timePeriodEnd={timePeriodEnd} />
                );
            case "projects":
                return (
                    <ProjectsStatistics timePeriodStart={timePeriodStart} timePeriodEnd={timePeriodEnd} />
                );
        }
    };

    return (
        <div className={classes.container}>
            <h1 className={classes.header}>
                {t('statistics')}
            </h1>
            <div className={classes.splitContainer}>
                <div className={classes.leftContainer}>
                    {handleRenderStatistics()}
                </div>
                <div className={classes.rightContainer}>
                    <h2>{t('chooseStatisticsType')}</h2>
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
                            <MenuItem value={type}>{t(type)}</MenuItem>
                        ))}
                    </Select>
                    <h2>{t('chooseTimePeriod')}</h2>
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
                        <MenuItem value={"monthly"}>{t('monthly')}</MenuItem>
                        <MenuItem value={"yearly"}>{t('yearly')}</MenuItem>
                        <MenuItem value={"all"}>{t('all')}</MenuItem>
                    </Select>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        {timePeriod === "monthly" &&
                            <DateCalendar
                                className={classes.calendar}
                                //defaultValue={dayjs(today)}
                                views={['month', 'year']}
                                openTo="month"
                                onMonthChange={handleDateChange}
                            />}
                        {timePeriod === "yearly" &&
                            <DateCalendar
                                className={classes.calendar}
                                //defaultValue={dayjs(today)}
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
