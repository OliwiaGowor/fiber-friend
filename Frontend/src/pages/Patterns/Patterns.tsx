import { json, useNavigate } from "react-router-dom";
import Tiles from "../../components/Tiles/Tiles";
import classes from './Patterns.module.scss'
import { patternsFilters } from "../../data/FiltersBarData";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Patterns() {
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width: 800px)');

    const fetchPatterns = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}Pattern${process.env.REACT_APP_ENV === "dev" ? "" : ".json"}`, {
            headers: {
                'Content-Type': 'application/json',
                //Authorization: "Bearer " + tokenLoader(),
            },
        });

        if (!response.ok) {
            throw json(
                { message: 'Could not fetch patterns.' },
                {
                    status: 500,
                }
            );
        } else {
            const resData = await response.json();

            return resData;
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
                <h1 className={classes.header}>PATTERNS</h1>
                <Tiles
                    link='new-pattern'
                    addText='New pattern'
                    fetchData={fetchPatterns}
                    addTile={true}
                    filters={patternsFilters}
                />
            </div>
        </>
    );
}