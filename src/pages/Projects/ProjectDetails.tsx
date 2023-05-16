import { CircularProgress } from "@mui/material";
import { Suspense } from "react";
import { Await, json, defer, useRouteLoaderData, useNavigate, Link } from "react-router-dom";
import classes from './ProjectDetails.module.scss';
import TabsPanelDisplay from "../../components/TabsPanelDisplay";
import EditIcon from '@mui/icons-material/Edit';
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FilesDisplay } from "../../components/FilesDisplay";
import PhotosDisplay from "../../components/PhotosDisplay";

export default function ProjectDetails() {
    const navigate = useNavigate();
    const { project } = useRouteLoaderData('project-details') as { project: any };
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [selectedPattern, setSelectedPattern] = React.useState<any | null>(null);

    const fetchSelectedPattern = React.useCallback(async () => {
        try {
            const response = await fetch('https://fiber-frined-default-rtdb.europe-west1.firebasedatabase.app/patterns/' + project.connectedPattern + '.json');
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const data = await response.json();
            setSelectedPattern(data);

        } catch (error) {
            //setError("Something went wrong, try again.");
        }
    }, []);

    React.useEffect(() => {
        fetchSelectedPattern();
    }, [fetchSelectedPattern]);

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
        const response = await fetch('https://fiber-frined-default-rtdb.europe-west1.firebasedatabase.app/projects/' + project.id + '.json', {
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
                <Await resolve={project}>
                    <div className={classes.details}>
                        <h1 className={classes.header}>
                            {project.name}
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
                                    <Button onClick={() => { return navigate('/fiber-friend/account/projects/' + project.id + '/edit') }}>
                                        Edit
                                    </Button>
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <Button onClick={handleDelete}>
                                        Delete project
                                    </Button>
                                </MenuItem>
                            </Menu>
                        </div>
                        <div className={classes.dividedContainer}>
                            <div className={classes.leftElements}>
                                <div className={classes.sectionContainer}>
                                    <h2 className={classes.sectionHeader}>Details</h2>
                                    <div className={classes.projectInfoContainer}>
                                        <div className={classes.attributeName}>Type: </div>
                                        {project.type ? project.type : <br></br>}

                                        <div className={classes.attributeName}>Category: </div>
                                        {project.category ? project.category : <br></br>}

                                        <div className={classes.attributeName}>Start date: </div>
                                        {project.startDate ? project.startDate : <br></br>}

                                        <div className={classes.attributeName}>End date: </div>
                                        {project.endDate ? project.endDate : <br></br>}
                                    </div>
                                </div>
                                <div className={`${classes.sectionContainer} ${classes.formInput}`}>
                                    <h2 className={classes.sectionHeader}>Yarns</h2>
                                    <TabsPanelDisplay yarns={project.yarns ? project.yarns : null} />
                                </div>

                            </div>
                            <div className={classes.rightElements}>
                                <div className={classes.sectionContainer}>
                                    <div className={classes.photosContainer}>
                                        <h2 className={classes.sectionHeader}>Photos</h2>
                                        <PhotosDisplay data={project} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={classes.wholeScreenElements}>
                            <div className={classes.sectionContainer}>
                                <h2 className={classes.sectionHeader}>Patterns and notes</h2>
                                <h3 className={classes.attributeName}>Patterns</h3>
                                {selectedPattern &&
                                    <div>
                                        <Link to={'/fiber-friend/account/patterns/' + project.connectedPattern}>
                                            <Button variant="contained">
                                            {selectedPattern.name}
                                            </Button>
                                        </Link>
                                    </div>}
                                <FilesDisplay files={project.patterns} />
                                <h3 className={classes.attributeName}>Notes</h3>
                                <div className={classes.notes}>{project.notes}</div>
                            </div>
                        </div>
                    </div>
                </Await>
            </Suspense>
        </div>
    );
}

async function loadProjectDetails(id: string) {
    const response = await fetch('https://fiber-frined-default-rtdb.europe-west1.firebasedatabase.app/projects/' + id + '.json');

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
    const id = params.projectId;
    return defer({
        project: await loadProjectDetails(id),
    });
}