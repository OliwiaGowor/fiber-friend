import { json, useNavigate } from "react-router-dom";
import Tiles from "../../components/Tiles/Tiles";
import classes from './Resources.module.scss'
import useMediaQuery from "@mui/material/useMediaQuery";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Resources() {
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width: 800px)');

    const fetchResources = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}Resource${process.env.REACT_APP_ENV === "dev" ? "" : ".json"}`, {
            headers: {
                'Content-Type': 'application/json',
                //Authorization: "Bearer " + tokenLoader(),
            },
        });

        if (!response.ok) {
            // return { isError: true, message: 'Could not fetch events.' };
            // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
            //   status: 500,
            // });
            throw json(
                { message: 'Could not fetch resources.' },
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
                <h1 className={classes.header}>RESOURCES</h1>
                <Tiles
                    link='new-resource'
                    addText='New resource'
                    fetchData={fetchResources}
                    addTile={true}
                />
            </div>
        </>
    );
}
