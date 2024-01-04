import classes from './CommunityPatterns.module.scss';
import Tiles from '../../components/Tiles/Tiles';
import { patternsFilters } from '../../data/FiltersBarData';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
import { useAppDispatch } from '../../utils/hooks';
import { tokenLoader } from '../../utils/auth';
import { setError } from '../../reducers/errorSlice';
import { handleRequest } from '../../utils/handleRequestHelper';
import { useTranslation } from 'react-i18next';

const CommunityPatterns = () => {
    const { t } = useTranslation("CommunityPatterns");
    const dispatch = useAppDispatch();

    const fetchCommunityPatterns = async (filters: string, page: number, pageSize: number) => {
        try {
            const data = await handleRequest(
                `${process.env.REACT_APP_API_URL}Pattern/GetCommunityPatterns?${filters ? "filters=" + filters + "&" : ""}page=${page}&pageSize=${pageSize}`,
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

    const handleGoToTop = () => {
        window.scrollTo(0, 0);
    };

    return (
        <div className={classes.container}>
            <h1 className={classes.header}>{t("communityPatterns")}</h1>
            <Tiles
                fetchData={fetchCommunityPatterns}
                addTile={false}
                filters={patternsFilters}
            />
            <Fab
                className={classes.upFab}
                aria-label="to top"
                onClick={handleGoToTop}
            >
                <NavigationIcon />
            </Fab>
        </div>
    );
}

export default CommunityPatterns;