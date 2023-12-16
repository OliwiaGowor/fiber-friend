import { json, useNavigate } from "react-router-dom";
import Tiles from "../../components/Tiles/Tiles";
import classes from './Resources.module.scss'
import useMediaQuery from "@mui/material/useMediaQuery";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAppDispatch } from '../../utils/hooks';
import { handleRequest } from "../../utils/handleRequestHelper";
import { tokenLoader } from "../../utils/auth";
import { setError } from "../../reducers/errorSlice";
import { useTranslation } from "react-i18next";
import { resourcesFilters } from "../../data/FiltersBarData";

export default function Resources() {
    const { t } = useTranslation("Resources");
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width: 800px)');

    const fetchResources = async (filters: string, page: number, pageSize: number ) => {
        try {
            const data = await handleRequest(
                `${process.env.REACT_APP_API_URL}Resource/GetResourcesForUser/${localStorage.getItem("userId")}?${filters ? "filters=" + filters + "&" : ""}page=${page}&pageSize=${pageSize}`,
                "GET",
                "Could not fetch resources. Please try again later.",
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
                    link='new-resource'
                    addText={t("newResource")}
                    fetchData={fetchResources}
                    addTile={true}
                    filters={resourcesFilters}
                />
            </div>
        </>
    );
}

export const resourcesTranslations = {
    en: {
        backButtonLabel: 'Back',
        header: 'RESOURCES',
        couldNotFetchResources: 'Could not fetch reosurces. Please try again later.',
        newResource: 'New resource',
    },
    pl: {
        backButtonLabel: 'Powrót',
        header: 'ZASOBY',
        couldNotFetchResourcess: 'Nie udało się pobrać zasobów. Spróbuj ponownie później.',
        newResource: 'Nowy zasób',
    }
}
