import CircularProgress from "@mui/material/CircularProgress";
import { Suspense } from "react";
import { useRouteLoaderData, Await, json, defer, useNavigate } from "react-router-dom";
import Tiles from "../../components/Tiles/Tiles";
import classes from './Counters.module.scss'
import { tokenLoader } from "../../utils/auth";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAppDispatch } from '../../utils/hooks';
import { handleRequest } from "../../utils/handleRequestHelper";
import { setError } from "../../reducers/errorSlice";
import { useTranslation } from "react-i18next";

function Counters() {
    const { t } = useTranslation("Counters");
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width: 800px)');

    const fetchCounters = async (filters: string, page: number, pageSize: number ) => {
        try {
            const data = await handleRequest(
                `${process.env.REACT_APP_API_URL}CountersGroup/GetCountersGroupsForUser/${localStorage.getItem("userId")}?${filters ? "filters=" + filters + "&" : ""}page=${page}&pageSize=${pageSize}`,
                "GET",
                "Could not fetch counters. Please try again later.",
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
                <h1 className={classes.header}>{t("header")}</h1>
                <Tiles
                    key="counters-tiles"
                    link='new-counter'
                    addText={t("newCounter")}
                    fetchData={fetchCounters}
                    addTile={true}

                />
            </div>
        </>
    );
}

export default Counters;

export const countersTranslations = {
    en: {
        backButtonLabel: 'Back',
        header: 'COUNTERS',
        couldNotFetchCounters: 'Could not fetch counters. Please try again later.',
        newCounter: 'New counter',
    },
    pl: {
        backButtonLabel: 'Powrót',
        header: 'LICZNIKI',
        couldNotFetchCounters: 'Nie udało się pobrać liczników. Spróbuj ponownie później.',
        newCounter: 'Nowy licznik',
    }
}
