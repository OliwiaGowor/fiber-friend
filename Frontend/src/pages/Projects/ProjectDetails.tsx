import { CircularProgress, useMediaQuery } from "@mui/material";
import { Suspense } from "react";
import { Await, json, defer, useRouteLoaderData, useNavigate, Link } from "react-router-dom";
import classes from './ProjectDetails.module.scss';
import TabsPanelDisplay from "../../components/TabsPanelDisplay/TabsPanelDisplay";
import EditIcon from '@mui/icons-material/Edit';
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FilesDisplay } from "../../components/FilesDisplay/FilesDisplay";
import PhotosDisplay from "../../components/PhotosDisplay/PhotosDisplay";
import TextDisplay from "../../components/TextEditor/TextDisplay";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import CounterGroup from "../../components/CounterGroup/CounterGroup";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAppDispatch } from '../../utils/hooks';
import { handleRequest } from "../../utils/handleRequestHelper";
import { tokenLoader } from "../../utils/auth";
import { setError } from "../../reducers/errorSlice";
import { useTranslation } from "react-i18next";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { NeedleworkType } from "../../DTOs/Enums";

export default function ProjectDetails() {
    const { t } = useTranslation("ProjectDetails");
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { project } = useRouteLoaderData('project-details') as { project: any };
    const isMobile = useMediaQuery('(max-width: 760px)');
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [anchorElPopover, setAnchorElPopover] = React.useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);
    const openPopover = Boolean(anchorElPopover);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setAnchorElPopover(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorElPopover(null);
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = async () => {
        try {
            await handleRequest(
                `${process.env.REACT_APP_API_URL}Project/${project.id}${process.env.REACT_APP_ENV === "dev" ? "" : ".json"}`,
                'DELETE',
                t('couldNotDeleteProject'),
                tokenLoader()
            );
            return navigate('/fiber-friend/account/projects');
        } catch (error) {
            dispatch(setError(error));
            return;
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
                    <Await resolve={project}>
                        <div className={classes.details}>
                            <h1 className={classes.header}>
                                <div>
                                    <div className={classes.name}>{project.name}</div>
                                    {project.finished &&
                                        <Typography
                                            aria-owns={openPopover ? 'mouse-over-popover' : undefined}
                                            aria-haspopup="true"
                                            onMouseEnter={handlePopoverOpen}
                                            onMouseLeave={handlePopoverClose}
                                            sx={{ display: "inline-block" }}
                                        >
                                            <CheckCircleIcon sx={{ fontSize: 30 }} />
                                        </Typography>
                                    }
                                    <Popover
                                        id="mouse-over-popover"
                                        sx={{
                                            pointerEvents: 'none',
                                        }}
                                        open={openPopover}
                                        anchorEl={anchorElPopover}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                        onClose={handlePopoverClose}
                                        disableRestoreFocus
                                        disableScrollLock={true}
                                    >
                                        <Typography sx={{ p: 2 }}>{t('projectFinished')}</Typography>
                                    </Popover>
                                </div>
                                <Button
                                    className={classes.editButton}
                                    aria-label="Edit Project"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                >
                                    <EditIcon sx={{ fontSize: 32 }} />
                                </Button>
                            </h1>
                            <div className={classes.editMenu}>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    disableScrollLock={true}
                                >
                                    <MenuItem
                                        onClick={() => {
                                            navigate('/fiber-friend/account/projects/' + project.id + '/edit');
                                            handleClose();
                                        }}
                                        disableRipple
                                    >
                                        {t('edit')}
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => {
                                            handleClose();
                                            handleDelete()
                                        }}
                                        disableRipple
                                    >
                                        {t('deleteProject')}
                                    </MenuItem>
                                </Menu>
                            </div>
                            <div className={classes.dividedContainer}>
                                <div className={classes.leftElements}>
                                    <div className={`${classes.sectionContainer} ${classes.topContainer}`}>
                                        <h2 className={classes.sectionHeader}>{t('detailsSectionHeader')}</h2>
                                        <div className={classes.projectInfoContainer}>
                                            <div className={classes.attributeName}>{t('type')} </div>
                                            {t(NeedleworkType[project.type]) ?? <br></br>}
                                            <div className={classes.attributeName}>{t('category')} </div>
                                            {project.category ?? <br></br>}
                                            <div className={classes.attributeName}>{t('startDate')} </div>
                                            {project.startDate?.slice(0, 10) ?? <br></br>}
                                            <div className={classes.attributeName}>{t('endDate')} </div>
                                            {project.endDate && project.endDate !== "0001-01-01T00:00:00" ? project.endDate?.slice(0, 10) : <br></br>}
                                        </div>
                                    </div>
                                    <div className={`${classes.sectionContainer} ${classes.formInput}`}>
                                        <h2 className={classes.sectionHeader}>{t('yarns')}</h2>
                                        <TabsPanelDisplay supplies={project.yarns ?? []} type="yarn" />
                                    </div>
                                </div>
                                <div className={classes.rightElements}>
                                    <div className={`${classes.sectionContainer} ${classes.photosSection}`}>
                                        {!isMobile && <h2 className={classes.sectionHeader}>{t('photos')}</h2>}
                                        <PhotosDisplay data={project} />
                                    </div>
                                </div>
                            </div>
                            <div className={classes.wholeScreenElements}>
                                <div className={classes.sectionContainer}>
                                    <h2 className={classes.sectionHeader}>{t('patternsAndNotes')}</h2>
                                    <h3 className={classes.attributeName}>{t('patterns')}</h3>
                                    {project.connectedPattern &&
                                        <div className={classes.connectedPattern}>
                                            <div className={classes.connectedPattern__header}>Połączony wzór: </div>
                                            <Link to={'/fiber-friend/account/patterns/' + project.connectedPattern?.id}>
                                                {project.connectedPattern?.name}
                                                <OpenInNewIcon />
                                            </Link>
                                        </div>}
                                    <FilesDisplay files={project.files} />
                                    <h3 className={classes.attributeName}>{t('counters')}</h3>
                                    <div className={classes.counters}>
                                        {<CounterGroup 
                                        defaultValue={project.counters ? project?.counters[0]?.counters : undefined} 
                                        projectId={project.id} 
                                        parentName={project.name}
                                        counterGroupId={project.counters ? project?.counters[0]?.id : undefined}
                                        />}
                                    </div>
                                    <h3 className={classes.attributeName}>{t('notes')}</h3>
                                    <div className={classes.notes}>
                                        <TextDisplay defaultValue={project.notes} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Await>
                </Suspense>
            </div>
        </>
    );
}

async function loadProjectDetails(id: string) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}Project/${id}${process.env.REACT_APP_ENV === "dev" ? "" : ".json"}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + tokenLoader(),
        },
    }
    );

    if (!response.ok) {
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

export async function loader({ params }: any) {
    const id = params.projectId;
    return defer({
        project: await loadProjectDetails(id),
    });
}