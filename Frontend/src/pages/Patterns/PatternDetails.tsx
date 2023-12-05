import { CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery } from "@mui/material";
import { Suspense } from "react";
import { Await, json, defer, useRouteLoaderData, useNavigate } from "react-router-dom";
import classes from './PatternDetails.module.scss';
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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShareIcon from '@mui/icons-material/Share';
import { useAppDispatch } from '../../utils/hooks';
import { handleRequest } from "../../utils/handleRequestHelper";
import { setError } from "../../reducers/errorSlice";

//TODO: for generating pdfs ask if attach added pattern files to it
export default function PatternDetails() {
    const token = tokenLoader();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { pattern } = useRouteLoaderData('pattern-details') as { pattern: Pattern };
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [shareOpen, setShareOpen] = React.useState(false);
    const open = Boolean(anchorEl);
    const isMobile = useMediaQuery('(max-width: 760px)');

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
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
    };

    const handleShare = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}Pattern/Share/${pattern.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authoriaztion: "Bearer " + token,
            },
        });
        //TODO: add popup with informatoon about sharing
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
    };

    React.useEffect(() => {
        if (pattern) {
            sessionStorage.setItem('patternData', JSON.stringify(pattern));
        };
    }, [pattern]);

    const handleClickShareOpen = () => {
        setShareOpen(true);
    };

    const handleShareClose = () => {
        setShareOpen(false);
    };

    return (
        <>
            {isMobile &&
                <div className={classes.backButton} onClick={() => navigate("/fiber-friend/account")}>
                    <ArrowBackIcon sx={{ fontSize: 35 }} />
                </div>
            }
            <div className={classes.container}>
                <Dialog
                    open={shareOpen}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Share your pattern"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Do you want to share this pattern with other users?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClose} autoFocus>
                            Share
                        </Button>
                    </DialogActions>
                </Dialog>

                <Suspense fallback={<p style={{ textAlign: 'center' }}><CircularProgress /></p>}>
                    <Await resolve={pattern}>
                        <div className={classes.details}>
                            <h1 className={classes.header}>
                                {pattern.name}
                                {pattern.isShared && <ShareIcon className={classes.shareIcon} />}
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
                                    {pattern.isAuthorial && <MenuItem onClick={() => { handleClose(); handleShare(); }}>
                                        Share pattern
                                    </MenuItem>}
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
                                            {pattern.isAuthorial &&
                                                <>
                                                    <div className={classes.attributeName}>Start date: </div>
                                                    {pattern.startDate ?? <br></br>}
                                                    <div className={classes.attributeName}>End date: </div>
                                                    {pattern.endDate ?? <br></br>}
                                                </>
                                            }
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
        </>
    );
}
async function loadPatternDetails(id: string) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}Pattern/${id}${process.env.REACT_APP_ENV === "dev" ? "" : ".json"}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + tokenLoader(),
        },
    });

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

export async function loader({ params }: any) {
    const id = params.patternId;
    return defer({
        pattern: await loadPatternDetails(id),
    });
}