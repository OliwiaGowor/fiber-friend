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
import { useAppDispatch } from '../../utils/hooks';
import { handleRequest } from "../../utils/handleRequestHelper";
import { setError } from "../../reducers/errorSlice";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useTranslation } from "react-i18next";

export default function CounterDetails() {
    const dispatch = useAppDispatch();
    const { t } = useTranslation("CounterDetails");
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
        try {
            await handleRequest(
                `${process.env.REACT_APP_API_URL}CountersGroup/${counterGroup.id}${process.env.REACT_APP_ENV === "dev" ? "" : ".json"}`,
                'DELETE',
                t('deleteCounterError'),
                tokenLoader()
            );
            return navigate('/fiber-friend/account/counters');
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
                                        {t('edit')}
                                    </MenuItem>
                                    <MenuItem onClick={() => { handleDelete(); handleClose(); }}>
                                        {t('deleteCounter')}
                                    </MenuItem>
                                </Menu>
                            </div>
                            {(counterGroup.patternId || counterGroup.projectId) &&
                                <div className={classes.sectionContainer}>
                                    <h2 className={classes.sectionHeader}>{t('connectedPatternProject', { type: counterGroup.patternId ? t('pattern') : t('project') })}</h2>
                                    <a
                                        className={classes.link}
                                        href={
                                            counterGroup.patternId ?
                                                `/fiber-friend/account/patterns/${counterGroup.patternId}`
                                                :
                                                `/fiber-friend/account/projects/${counterGroup.projectId}`

                                        }>
                                        {counterGroup.patternName ?? counterGroup.projectName}
                                        <OpenInNewIcon />
                                    </a>
                                </div>}
                            <div className={classes.sectionContainer}>
                                <h2 className={classes.sectionHeader}>{t('countersSection')}</h2>
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
    const response = await fetch(`${process.env.REACT_APP_API_URL}CountersGroup/${id}${process.env.REACT_APP_ENV === "dev" ? "" : ".json"}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + tokenLoader(),
        },
    });

    if (!response.ok) {
        throw json(
            { message: "Could not fetch counters." },
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
