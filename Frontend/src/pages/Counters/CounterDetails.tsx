import { CircularProgress, useMediaQuery } from "@mui/material";
import { Suspense } from "react";
import { Await, json, defer, useRouteLoaderData, useNavigate } from "react-router-dom";
import classes from './CounterDetails.module.scss';
import EditIcon from '@mui/icons-material/Edit';
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CounterMiniature from "../../components/CounterMiniature/CounterMiniature";
import { tokenLoader } from "../../utils/auth";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function CounterDetails() {
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width: 760px)');
    const { counterGroup } = useRouteLoaderData('counter-details') as { counterGroup: any };
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}CounterGroup/${counterGroup.id}${process.env.REACT_APP_ENV === "dev" ? "" : ".json"}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + tokenLoader(),
            },
        });

        if (!response.ok) {
            // return { isError: true, message: 'Could not fetch counter.' };
            // throw new Response(JSON.stringify({ message: 'Could not fetch counter.' }), {
            //   status: 500,
            // });
            throw json(
                { message: 'Could not fetch counter.' },
                {
                    status: 500,
                }
            );
        } else {
            return navigate('/fiber-friend/account/counters');
        }
    }

    return (
        <>
            {isMobile &&
                <div className={classes.backButton} onClick={() => navigate("/fiber-friend/account")}>
                    <ArrowBackIcon sx={{ fontSize: 35 }} />
                </div>
            }
            <div className={classes.container}>
                <Suspense fallback={<p style={{ textAlign: 'center' }}><CircularProgress /></p>}>
                    <Await resolve={counterGroup}>
                        <div className={classes.details}>
                            <h1 className={classes.header}>
                                {counterGroup.name}
                                <Button
                                    id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                    className={classes.editButton}
                                >
                                    <EditIcon className={classes.editIcon} aria-label="Edit" />
                                </Button>
                            </h1>
                            <div className={classes.editMenu}>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                >
                                    <MenuItem onClick={() => { handleClose(); return navigate('/fiber-friend/account/counters/' + counterGroup.id + '/edit'); }}>
                                        Edit
                                    </MenuItem>
                                    <MenuItem onClick={() => { handleDelete(); handleClose(); }}>
                                        Delete counter
                                    </MenuItem>
                                </Menu>
                            </div>
                            <div className={classes.sectionContainer}>
                                <h2 className={classes.sectionHeader}>Counters</h2>
                                <div className={classes.counters}>
                                    {counterGroup.counters.map((counter: any, index: number) => (
                                        <CounterMiniature
                                            key={index}
                                            editable={false}
                                            counter={counter}
                                            backgroundColor="var(--background-color)"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Await>
                </Suspense>
            </div>
        </>
    );
}

async function loadCounterDetails(id: string) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}CounterGroup/${id}${process.env.REACT_APP_ENV === "dev" ? "" : ".json"}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + tokenLoader(),
        },
    });

    if (!response.ok) {
        // return { isError: true, message: 'Could not fetch Counter.' };
        // throw new Response(JSON.stringify({ message: 'Could not fetch Counter.' }), {
        //   status: 500,
        // });
        throw json(
            { message: 'Could not fetch counter.' },
            {
                status: 500,
            }
        );
    } else {
        const resData = await response.json();
        resData.id = id;
        return resData;
    }
}

export async function loader({ request, params }: any) {
    const id = params.counterId;
    return defer({
        counterGroup: await loadCounterDetails(id),
    });
}