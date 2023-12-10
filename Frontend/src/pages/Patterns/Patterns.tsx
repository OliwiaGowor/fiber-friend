import { useNavigate } from "react-router-dom";
import Tiles from "../../components/Tiles/Tiles";
import classes from './Patterns.module.scss'
import { patternsFilters } from "../../data/FiltersBarData";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useMediaQuery from "@mui/material/useMediaQuery";
import { setError } from "../../reducers/errorSlice";
import { useAppDispatch } from "../../utils/hooks";
import { handleRequest } from "../../utils/handleRequestHelper";
import { tokenLoader } from "../../utils/auth";
import { useTranslation } from "react-i18next";

export const patternsTranslations = {
    en: {
        backButtonLabel: 'Back',
        header: 'PATTERNS',
        couldNotFetchPatterns: 'Could not fetch patterns. Please try again later.',
        newPattern: 'New pattern',
    },
    pl: {
        backButtonLabel: 'Powrót',
        header: 'WZORY',
        couldNotFetchPatterns: 'Nie udało się pobrać wzorów. Spróbuj ponownie później.',
        newPattern: 'Nowy wzór',
    }
}

export default function Patterns() {
    const { t } = useTranslation("Patterns");
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width: 800px)');

    const fetchPatterns = async (filters: string, page: number, pageSize: number) => {
        try {
            const data = await handleRequest(
                process.env.REACT_APP_API_URL === "prod" ? `${process.env.REACT_APP_API_URL}Pattern${process.env.REACT_APP_ENV === "dev" ? "" : ".json"}` :
                    `${process.env.REACT_APP_API_URL}Pattern/GetPatternsForUser/${localStorage.getItem("userId")}?${filters ? "filters=" + filters + "&" : ""}page=${page}&pageSize=${pageSize}`,
                "GET",
                t("couldNotFetchPatterns"),
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
                <h1 className={classes.header}>{t('patterns')}</h1>
                <Tiles
                    link='new-pattern'
                    addText={t('newPattern')}
                    fetchData={fetchPatterns}
                    addTile={true}
                    filters={patternsFilters}
                />
            </div>
        </>
    );
}