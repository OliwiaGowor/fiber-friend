import classes from './CommunityPatterns.module.scss';
import Tiles from '../../components/Tiles/Tiles';
import { patternsFilters } from '../../data/FiltersBarData';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
import { useAppDispatch } from '../../utils/hooks';
import { tokenLoader } from '../../utils/auth';
import { setError } from '../../reducers/errorSlice';
import { handleRequest } from '../../utils/handleRequestHelper';

const CommunityPatterns = () => {
    const dispatch = useAppDispatch();

    const fetchProjects = async (page: number, pageSize: number, filters: object[]) => {
        //`${process.env.REACT_APP_API_URL}Pattern/GetSharedPatterns/${filters}/page=${page}/pageSize=${pageSize}`
        try {
            return (
                await handleRequest(
                    `${process.env.REACT_APP_API_URL}Pattern${process.env.REACT_APP_ENV === "dev" ? "" : ".json"}`,
                    "GET",
                    "Could not fetch patterns. Please try again later.",
                ));
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
            <h1 className={classes.header}>PATTERNS</h1>
            <Tiles
                link='new-pattern'
                addText='New pattern'
                fetchData={fetchProjects}
                addTile={false}
                filters={patternsFilters}
            />
            <Fab
                className={classes.upFab}
                aria-label="add"
                onClick={handleGoToTop}
            >
                <NavigationIcon />
            </Fab>
        </div>
    );
}

export default CommunityPatterns;