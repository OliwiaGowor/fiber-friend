import { CircularProgress } from "@mui/material";
import { Suspense } from "react";
import { Await, json, defer, useRouteLoaderData, useNavigate } from "react-router-dom";
import classes from './CounterDetails.module.scss';
import EditIcon from '@mui/icons-material/Edit';
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CounterMiniature from "../../components/CounterMiniature";

export default function CounterDetails() {
    const navigate = useNavigate();
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
        const response = await fetch('https://fiber-frined-default-rtdb.europe-west1.firebasedatabase.app/counterGroups/' + counterGroup.id + '.json', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
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
                                <EditIcon className={classes.editIcon} />
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
                                <MenuItem onClick={handleClose}>
                                    <Button onClick={() => { return navigate('/fiber-friend/account/counters/' + counterGroup.id + '/edit') }}>
                                        Edit
                                    </Button>
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <Button onClick={handleDelete}>
                                        Delete counter
                                    </Button>
                                </MenuItem>
                            </Menu>
                        </div>
                        <div className={classes.sectionContainer}>
                            <h2 className={classes.sectionHeader}>Counters</h2>
                            <div className={classes.counters}>
                                {counterGroup.counters.map((counter: any) => (
                                    <CounterMiniature editable={false} counter={counter} backgroundColor="var(--background-color)" />
                                ))}
                            </div>
                        </div>
                    </div>
                </Await>
            </Suspense>
        </div>
    );
}

async function loadCounterDetails(id: string) {
    const response = await fetch('https://fiber-frined-default-rtdb.europe-west1.firebasedatabase.app/counterGroups/' + id + '.json');

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