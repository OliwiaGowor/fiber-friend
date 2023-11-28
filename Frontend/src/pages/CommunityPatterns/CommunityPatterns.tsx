import classes from './CommunityPatterns.module.scss';
import Tiles from '../../components/Tiles/Tiles';
import { patternsFilters } from '../../data/FiltersBarData';
import { json } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';

const CommunityPatterns = () => {
    const fetchProjects = async (page: number, pageSize: number, filters: object[]) => {
        //`${process.env.REACT_APP_API_URL}Pattern/GetSharedPatterns/${filters}/page=${page}/pageSize=${pageSize}`
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}Pattern${process.env.REACT_APP_ENV === "dev" ? "" : ".json"}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    //Authorization: "Bearer " + tokenLoader(),
                },
            });

            if (!response.ok) {
                localStorage.setItem("error", "Could not fetch projects.");

                return json(
                    { message: 'Could not fetch projects.' },
                    {
                        status: 500,
                    }
                );
            } else {
                const resData = await response.json();
                return resData;
            }
        } catch (error) {
            localStorage.setItem("error", "Could not fetch projects.");

            return json(
                { message: 'Could not fetch projects.' },
                {
                    status: 500,
                }
            );
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