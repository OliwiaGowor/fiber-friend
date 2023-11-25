import * as React from 'react';
import { Suspense } from "react";
import { Await, json, defer, useRouteLoaderData, useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import { CircularProgress, useMediaQuery } from "@mui/material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PhotosDisplay from "../../components/PhotosDisplay/PhotosDisplay";
import TextDisplay from "../../components/TextEditor/TextDisplay";
import classes from './ResourceDetails.module.scss';
import { getAuthToken } from '../../utils/auth';

export default function ResourceDetails() {
    const token = getAuthToken();
    const navigate = useNavigate();
    const { resource } = useRouteLoaderData('resource-details') as { resource: any };
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const isMobile = useMediaQuery('(max-width: 760px)');

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const pagination = {
        clickable: true,
        renderBullet: function (index: number, className: string) {
            return '<span class="' + className + '">' + "</span>";
        },
    };

    const handleDelete = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}Resource/${resource.id}${process.env.REACT_APP_ENV === "dev" ? "" : ".json"}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authoriaztion: "Bearer " + token,
            },
        });

        if (!response.ok) {
            // return { isError: true, message: 'Could not fetch project.' };
            // throw new Response(JSON.stringify({ message: 'Could not fetch project.' }), {
            //   status: 500,
            // });
            throw json(
                { message: 'Could not fetch resource.' },
                {
                    status: 500,
                }
            );
        } else {
            return navigate('/fiber-friend/account/projects');
        }
    };

    const renderInfoElements = () => {
        if (resource.type === 'yarn') {
            return (
                <>
                    <div className={classes.attributeName}>Tool size: </div>
                    {resource.category ?? <br></br>}

                    <div className={classes.attributeName}>Gauge: </div>
                    {resource.startDate ?? <br></br>}

                    <div className={classes.attributeName}>Skein weight: </div>
                    {resource.endDate ?? <br></br>}

                    <div className={classes.attributeName}>Meters in skein: </div>
                    {resource.endDate ?? <br></br>}
                </>
            );
        } else if (resource.type === 'tool') {
            return (
                <>
                    <div className={classes.attributeName}>Tool size: </div>
                    {resource.category ?? <br></br>}
                    <div className={classes.attributeName}>Tool type: </div>
                    {resource.startDate ?? <br></br>}

                </>
            );
        } else {
            return (
                <>
                    <div className={classes.attributeName}>Tool size: </div>
                    {resource.category ?? <br></br>}

                    <div className={classes.attributeName}>Tool type: </div>
                    {resource.startDate ?? <br></br>}
                </>
            );
        }
    };

    return (
        <div className={classes.container}>
            <Suspense fallback={<p style={{ textAlign: 'center' }}><CircularProgress /></p>}>
                <Await resolve={resource}>
                    <div className={classes.details}>
                        <h1 className={classes.header}>
                            {resource.name}
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
                                <MenuItem onClick={() => { handleClose(); return navigate('/fiber-friend/account/resources/' + resource.id + '/edit'); }}>
                                    Edit
                                </MenuItem>
                                <MenuItem onClick={() => { handleDelete(); handleClose(); }}>
                                    Delete counter
                                </MenuItem>
                            </Menu>
                        </div>
                        <div className={classes.dividedContainer}>
                            <div className={classes.leftElements}>
                                <div className={`${classes.sectionContainer} ${classes.topContainer}`}>
                                    <h2 className={classes.sectionHeader}>Details</h2>
                                    <div className={classes.resourceInfoContainer}>
                                        <div className={classes.attributeName}>Type: </div>
                                        {resource.type ? resource.type : <br></br>}
                                        {renderInfoElements()}
                                        <div className={classes.attributeName}>Quantity: </div>
                                        {resource.quantity ? resource.quantity : <br></br>}
                                    </div>
                                </div>
                            </div>
                            <div className={classes.rightElements}>
                                <div className={`${classes.sectionContainer} ${classes.photosSection}`}>
                                {!isMobile && <h2 className={classes.sectionHeader}>Photos</h2>}
                                        <PhotosDisplay data={resource} />
                                </div>
                            </div>
                        </div>
                        <div className={classes.wholeScreenElements}>
                            <div className={classes.sectionContainer}>
                                <h2 className={classes.sectionHeader}>Notes</h2>
                                <div className={classes.notes}><TextDisplay defaultValue={resource.notes} /></div>
                            </div>
                        </div>
                    </div>
                </Await>
            </Suspense>
        </div>
    );
}

async function loadResourceDetails(id: string) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}Resource/${id}${process.env.REACT_APP_ENV === "dev" ? "" : ".json"}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authoriaztion: "Bearer " + getAuthToken(),
        },
    });

    if (!response.ok) {
        // return { isError: true, message: 'Could not fetch project.' };
        // throw new Response(JSON.stringify({ message: 'Could not fetch project.' }), {
        //   status: 500,
        // });
        throw json(
            { message: 'Could not fetch project.' },
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
    const id = params.resourceId;
    return defer({
        resource: await loadResourceDetails(id),
    });
}