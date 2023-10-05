import { CircularProgress } from "@mui/material";
import { Suspense } from "react";
import { Await, json, defer, useRouteLoaderData, useNavigate, Link } from "react-router-dom";
import classes from './PatternDetails.module.scss';
import TabsPanelDisplay from "../../components/TabsPanelDisplay";
import EditIcon from '@mui/icons-material/Edit';
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FilesDisplay } from "../../components/FilesDisplay";
import PhotosDisplay from "../../components/PhotosDisplay";
import TextDisplay from "../../components/TextEditor/TextDisplay";

export default function PatternDetails() {
    const navigate = useNavigate();
    const { pattern } = useRouteLoaderData('pattern-details') as { pattern: any };
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [selectedProject, setSelectedProject] = React.useState<any | null>(null);

    const fetchSelectedProject = React.useCallback(async () => {
        try {
            const response = await fetch('https://fiber-frined-default-rtdb.europe-west1.firebasedatabase.app/projects/' + pattern.connectedProject + '.json');
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const data = await response.json();
            setSelectedProject(data);

        } catch (error) {
            //setError("Something went wrong, try again.");
        }
    }, []);

    React.useEffect(() => {
        fetchSelectedProject();
    }, [fetchSelectedProject]);

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
        const response = await fetch('https://fiber-frined-default-rtdb.europe-west1.firebasedatabase.app/projects/' + pattern.id + '.json', {
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
                { message: 'Could not fetch project.' },
                {
                    status: 500,
                }
            );
        } else {
            return navigate('/fiber-friend/account/projects');
        }
    }

    return (
        <div className={classes.container}>
            <Suspense fallback={<p style={{ textAlign: 'center' }}><CircularProgress /></p>}>
                <Await resolve={pattern}>
                    <div className={classes.details}>
                        <h1 className={classes.header}>
                            {pattern.name}
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
                                <MenuItem onClick={() => { handleClose(); return navigate('/fiber-friend/account/patterns/' + pattern.id + '/edit'); }}>
                                    Edit
                                </MenuItem>
                                <MenuItem onClick={() => { handleClose(); handleDelete(); }}>
                                    Delete pattern
                                </MenuItem>
                            </Menu>
                        </div>
                        <div className={classes.dividedContainer}>
                            <div className={classes.leftElements}>
                                <div className={classes.sectionContainer}>
                                    <h2 className={classes.sectionHeader}>Details</h2>
                                    <div className={classes.projectInfoContainer}>
                                        <div className={classes.attributeName}>Type: </div>
                                        {pattern.type ? pattern.type : <br></br>}

                                        <div className={classes.attributeName}>Category: </div>
                                        {pattern.category ? pattern.category : <br></br>}

                                        <div className={classes.attributeName}>Start date: </div>
                                        {pattern.startDate ? pattern.startDate : <br></br>}

                                        <div className={classes.attributeName}>End date: </div>
                                        {pattern.endDate ? pattern.endDate : <br></br>}
                                    </div>
                                </div>
                                <div className={`${classes.sectionContainer} ${classes.formInput}`}>
                                    <h2 className={classes.sectionHeader}>Yarns</h2>
                                    <TabsPanelDisplay yarns={pattern.yarns ? pattern.yarns : null} />
                                </div>

                            </div>
                            <div className={classes.rightElements}>
                                <div className={classes.sectionContainer}>
                                    <div className={classes.photosContainer}>
                                        <h2 className={classes.sectionHeader}>Photos</h2>
                                        <PhotosDisplay data={pattern} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={classes.wholeScreenElements}>
                            <div className={classes.sectionContainer}>
                                <h2 className={classes.sectionHeader}>Files and notes</h2>
                                <h3 className={classes.attributeName}>Files</h3>
                                {selectedProject &&
                                    <div>
                                        <Link to={'/fiber-friend/account/patterns/' + pattern.connectedProject}>
                                            <Button variant="contained">
                                                {selectedProject.name}
                                            </Button>
                                        </Link>
                                    </div>}
                                <FilesDisplay files={pattern.files} />
                                <h3 className={classes.attributeName}>Notes</h3>
                                <div className={classes.notes}><TextDisplay defaultValue={pattern.notes} /></div>
                            </div>
                        </div>
                    </div>
                </Await>
            </Suspense>
        </div>
    );
}

async function loadPatternDetails(id: string) {
    const response = await fetch('https://fiber-frined-default-rtdb.europe-west1.firebasedatabase.app/patterns/' + id + '.json');

    if (!response.ok) {
        // return { isError: true, message: 'Could not fetch pattern.' };
        // throw new Response(JSON.stringify({ message: 'Could not fetch pattern.' }), {
        //   status: 500,
        // });
        throw json(
            { message: 'Could not fetch pattern.' },
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
    const id = params.patternId;
    return defer({
        pattern: await loadPatternDetails(id),
    });
}