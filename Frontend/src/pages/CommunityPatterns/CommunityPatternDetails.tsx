import { CircularProgress, useMediaQuery } from "@mui/material";
import { Suspense } from "react";
import { Await, json, defer, useRouteLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import classes from './CommunityPatternDetails.module.scss';
import TabsPanelDisplay from "../../components/TabsPanelDisplay/TabsPanelDisplay";
import EditIcon from '@mui/icons-material/Edit';
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FilesDisplay } from "../../components/FilesDisplay/FilesDisplay";
import PhotosDisplay from "../../components/PhotosDisplay/PhotosDisplay";
import TextDisplay from "../../components/TextEditor/TextDisplay";
import CounterGroup from "../../components/CounterGroup/CounterGroup";
import { tokenLoader } from "../../utils/auth";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PatternPdf } from "../../components/PatternPdf/PatternPdf";
import { Pattern } from "../../DTOs/Pattern";
import { useAppDispatch } from '../../utils/hooks';
import { handleRequest } from "../../utils/handleRequestHelper";
import { setError } from "../../reducers/errorSlice";

export default function CommunityPatternDetails() {
    const dispatch = useAppDispatch();
    const token = tokenLoader();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const patternId = searchParams.get('communityPatternId') ?? '';
    //const { pattern } = useRouteLoaderData('community-pattern-details') as { pattern: Pattern };
    const [pattern, setPattern] = React.useState<Pattern>({} as Pattern);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const isMobile = useMediaQuery('(max-width: 760px)');

    const fetchPattern = async (id: string) => {
        try {
            const patternData = await handleRequest(
                `${process.env.REACT_APP_API_URL}Pattern/${id}${process.env.REACT_APP_ENV === "dev" ? "" : ".json"}`,
                'GET',
                'Could not fetch pattern. Please try again later.',
                token
            );
            setPattern(patternData);
        } catch (error) {
            dispatch(setError(error));
            return;
        }
    };

    React.useEffect(() => {
        if (patternId) {
            fetchPattern(patternId);
        }
    }
        , []);

    React.useEffect(() => {
        if (!token) {
            navigate('/fiber-friend/login');
        }
    }, [token]);

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
        try {
            await handleRequest(
                `${process.env.REACT_APP_API_URL}Pattern/${pattern.id}${process.env.REACT_APP_ENV === "dev" ? "" : ".json"}`,
                'DELETE',
                'Could not delete pattern. Please try again later.',
                token
            );
            return navigate('/fiber-friend/account/projects');
        } catch (error) {
            dispatch(setError(error));
            return;
        }
    }

    React.useEffect(() => {
        if (pattern) {
            // store your data in a session or local storage
            sessionStorage.setItem('patternData', JSON.stringify(pattern));
        };
    }, [pattern]);

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
                                <MenuItem onClick={() => {
                                    handleClose();
                                }}
                                >
                                    <PDFDownloadLink document={<PatternPdf />} fileName={`${pattern.name}.pdf`}>
                                        Generate PDF
                                    </PDFDownloadLink>
                                </MenuItem>
                                <MenuItem onClick={() => {
                                    handleClose();
                                    return navigate('/fiber-friend/account/patterns/' + pattern.id + '/edit');
                                }}
                                >
                                    Edit
                                </MenuItem>
                                <MenuItem onClick={() => { handleClose(); handleDelete(); }}>
                                    Delete pattern
                                </MenuItem>
                            </Menu>
                        </div>
                        <div className={classes.dividedContainer}>
                            <div className={classes.leftElements}>
                                <div className={`${classes.sectionContainer} ${classes.topContainer}`}>
                                    <h2 className={classes.sectionHeader}>Details</h2>
                                    <div className={classes.projectInfoContainer}>
                                        <div className={classes.attributeName}>Author: </div>
                                        {pattern?.author?.username ?? <br></br>}
                                        <div className={classes.attributeName}>Type: </div>
                                        {pattern.type ?? <br></br>}
                                        <div className={classes.attributeName}>Category: </div>
                                        {pattern.category ?? <br></br>}
                                    </div>
                                </div>
                            </div>
                            <div className={classes.rightElements}>
                                <div className={`${classes.sectionContainer} ${classes.photosSection}`}>
                                    {!isMobile && <h2 className={classes.sectionHeader}>Photos</h2>}
                                    <PhotosDisplay data={pattern} />
                                </div>
                            </div>
                        </div>
                        <div className={classes.wholeScreenElements}>
                            <div className={`${classes.sectionContainer}`}>
                                <h2 className={classes.sectionHeader}>Yarns</h2>
                                <TabsPanelDisplay supplies={pattern.yarns ?? []} type={"yarn"} />
                            </div>
                            <div className={`${classes.sectionContainer}`}>
                                <h2 className={classes.sectionHeader}>Tools</h2>
                                <TabsPanelDisplay supplies={pattern.tools ?? []} type={"tool"} />
                            </div>
                            <div className={`${classes.sectionContainer}`}>
                                <h2 className={classes.sectionHeader}>Other supplies</h2>
                                <TabsPanelDisplay supplies={pattern.otherSupplies ?? []} type={"other supply"} />
                            </div>
                            <div className={classes.sectionContainer}>
                                <h2 className={classes.sectionHeader}>Files and notes</h2>
                                <h3 className={classes.attributeName}>Files</h3>
                                <FilesDisplay files={pattern.files} />
                                <h3 className={classes.attributeName}>Counters</h3>
                                <div className={classes.counters}><CounterGroup parentId={pattern.id ?? ''} /></div>
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

async function loadCommunityPatternDetails(id: string) {
    try {
        const pattern = await handleRequest(
            `${process.env.REACT_APP_API_URL}Pattern/${id}${process.env.REACT_APP_ENV === "dev" ? "" : ".json"}`,
            "GET",
            "Could not fetch pattern.",
            tokenLoader(),
        );

        pattern.id = id;
        return pattern;
    } catch (error) {
        throw error;
    }
}

export async function loader({ params }: any) {
    const id = params.communityPatternId;
    return defer({
        pattern: await loadCommunityPatternDetails(id),
    });
}