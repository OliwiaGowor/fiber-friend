import * as React from 'react';
import { Suspense } from "react";
import { Await, json, defer, useRouteLoaderData, useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import { CircularProgress } from "@mui/material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PhotosDisplay from "../../components/PhotosDisplay/PhotosDisplay";
import TextDisplay from "../../components/TextEditor/TextDisplay";
import classes from './SupplyDetails.module.scss';

export default function SupplyDetails() {
    const navigate = useNavigate();
    const { supply } = useRouteLoaderData('supply-details') as { supply: any };
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

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
        const response = await fetch('https://fiber-frined-default-rtdb.europe-west1.firebasedatabase.app/supplies/' + supply.id + '.json', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            // return { isError: true, message: 'Could not fetch project.' };
            // throw new Response(JSON.stringify({ message: 'Could not fetch project.' }), {
            //   status: 500,
            // });
            throw json(
                { message: 'Could not fetch supply.' },
                {
                    status: 500,
                }
            );
        } else {
            return navigate('/fiber-friend/account/projects');
        }
    };

    const renderInfoElements = () => {
        if (supply.type === 'yarn') {
            return (
                <>
                    <div className={classes.attributeName}>Tool size: </div>
                    {supply.category ? supply.toolSize : <br></br>}

                    <div className={classes.attributeName}>Gauge: </div>
                    {supply.startDate ? supply.gauge : <br></br>}

                    <div className={classes.attributeName}>Skein weight: </div>
                    {supply.endDate ? supply.weight : <br></br>}

                    <div className={classes.attributeName}>Meters in skein: </div>
                    {supply.endDate ? supply.meters : <br></br>}
                </>
            );
        } else if (supply.type === 'tool') {
            return (
                <>
                    <div className={classes.attributeName}>Tool size: </div>
                    {supply.category ? supply.toolSize : <br></br>}

                    <div className={classes.attributeName}>Tool type: </div>
                    {supply.startDate ? supply.toolType : <br></br>}

                </>
            );
        } else {
            return (
                <>
                    <div className={classes.attributeName}>Tool size: </div>
                    {supply.category ? supply.toolSize : <br></br>}

                    <div className={classes.attributeName}>Tool type: </div>
                    {supply.startDate ? supply.toolType : <br></br>}
                </>
            );
        }
    };

    return (
        <div className={classes.container}>
            <Suspense fallback={<p style={{ textAlign: 'center' }}><CircularProgress /></p>}>
                <Await resolve={supply}>
                    <div className={classes.details}>
                        <h1 className={classes.header}>
                            {supply.name}
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
                                <MenuItem onClick={() => { handleClose(); return navigate('/fiber-friend/account/supplies/' + supply.id + '/edit'); }}>
                                    Edit
                                </MenuItem>
                                <MenuItem onClick={() => { handleDelete(); handleClose(); }}>
                                    Delete counter
                                </MenuItem>
                            </Menu>
                        </div>
                        <div className={classes.dividedContainer}>
                            <div className={classes.leftElements}>
                                <div className={classes.sectionContainer}>
                                    <h2 className={classes.sectionHeader}>Details</h2>
                                    <div className={classes.supplyInfoContainer}>
                                        <div className={classes.attributeName}>Type: </div>
                                        {supply.type ? supply.type : <br></br>}
                                        {renderInfoElements()}
                                        <div className={classes.attributeName}>Quantity: </div>
                                        {supply.quantity ? supply.quantity : <br></br>}
                                    </div>
                                </div>
                            </div>
                            <div className={classes.rightElements}>
                                <div className={classes.sectionContainer}>
                                    <div className={classes.photosContainer}>
                                        <h2 className={classes.sectionHeader}>Photos</h2>
                                        <PhotosDisplay data={supply} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={classes.wholeScreenElements}>
                            <div className={classes.sectionContainer}>
                                <h2 className={classes.sectionHeader}>Notes</h2>
                                <div className={classes.notes}><TextDisplay defaultValue={supply.notes} /></div>
                            </div>
                        </div>
                    </div>
                </Await>
            </Suspense>
        </div>
    );
}

async function loadSupplyDetails(id: string) {
    const response = await fetch('https://fiber-frined-default-rtdb.europe-west1.firebasedatabase.app/supplies/' + id + '.json');

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
    const id = params.supplyId;
    return defer({
        supply: await loadSupplyDetails(id),
    });
}