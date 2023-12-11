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
import { PDFDownloadLink, View } from "@react-pdf/renderer";
import { PatternPdf } from "../../components/PatternPdf/PatternPdf";
import { Pattern } from "../../DTOs/Pattern";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShareIcon from '@mui/icons-material/Share';
import { useAppDispatch } from '../../utils/hooks';
import { handleRequest } from "../../utils/handleRequestHelper";
import { setError } from "../../reducers/errorSlice";
import { useTranslation } from "react-i18next";

//TODO: for generating pdfs ask if attach added pattern files to it
export default function PatternDetails() {
    const { t } = useTranslation("PatternDetails");
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
        //TODO: add popup with informatoon about sharing
        const shareData = {
            id: pattern.id,
            name: pattern.name,
            isShared: true,
            isAuthorial: pattern.isAuthorial,
            type: pattern.type,
            category: pattern.category,
            startDate: pattern.startDate,
            endDate: pattern.endDate,
            notes: pattern.notes,
            files: pattern.files,
            yarns: pattern.yarns,
            tools: pattern.tools,
            otherSupplies: pattern.otherSupplies,
            photos: pattern.photos,
            counters: pattern.counters,
            finished: pattern.finished,
            authorId: pattern.author?.id,

        };
        try {
            const data = await handleRequest(
                `${process.env.REACT_APP_API_URL}Pattern/${pattern.id}${process.env.REACT_APP_ENV === "dev" ? "" : ".json"}`,
                'PUT',
                'Could not share pattern. Please try again later.',
                token,
                shareData,
            );

            window.location.reload();
        } catch (error) {
            dispatch(setError(error));
            return;
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
                        {t('shareDialogTitle')}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {t('shareDialogContent')}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClose} autoFocus>
                            {t('sharePattern')}
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
                                            {t('generatePdf')}
                                        </PDFDownloadLink>
                                    </MenuItem>
                                    <MenuItem onClick={() => {
                                        handleClose();
                                        return navigate('/fiber-friend/account/patterns/' + pattern.id + '/edit');
                                    }}
                                    >
                                        {t('edit')}
                                    </MenuItem>
                                    {pattern.isAuthorial && <MenuItem onClick={() => { handleClose(); handleShare(); }}>
                                        {t('sharePattern')}
                                    </MenuItem>}
                                    <MenuItem onClick={() => { handleClose(); handleDelete(); }}>
                                        {t('deletePattern')}
                                    </MenuItem>
                                </Menu>
                            </div>
                            <div className={classes.dividedContainer}>
                                <div className={classes.leftElements}>
                                    <div className={`${classes.sectionContainer} ${classes.topContainer}`}>
                                        <h2 className={classes.sectionHeader}>Details</h2>
                                        <div className={classes.projectInfoContainer}>
                                            <div className={classes.attributeName}>{t('author')} </div>
                                            {pattern?.author?.username ?? <br></br>}
                                            <div className={classes.attributeName}>{t('type')} </div>
                                            {pattern.type ?? <br></br>}
                                            <div className={classes.attributeName}>{t('category')} </div>
                                            {pattern.category ?? <br></br>}
                                            {pattern.isAuthorial &&
                                                <>
                                                    <div className={classes.attributeName}>{t('startDate')} </div>
                                                    {pattern.startDate ?? <br></br>}
                                                    <div className={classes.attributeName}>{t('endDate')} </div>
                                                    {pattern.endDate ?? <br></br>}
                                                </>
                                            }
                                        </div>
                                    </div>

                                </div>
                                <div className={classes.rightElements}>
                                    <div className={`${classes.sectionContainer} ${classes.photosSection}`}>
                                        {!isMobile && <h2 className={classes.sectionHeader}>{t('photos')}</h2>}
                                        <PhotosDisplay data={pattern} />
                                    </div>
                                </div>
                            </div>
                            <div className={classes.wholeScreenElements}>
                                <div className={`${classes.sectionContainer}`}>
                                    <h2 className={classes.sectionHeader}>{t('yarns')}</h2>
                                    <TabsPanelDisplay supplies={pattern.yarns ?? []} type={"yarn"} />
                                </div>
                                <div className={`${classes.sectionContainer}`}>
                                    <h2 className={classes.sectionHeader}>{t('tools')}</h2>
                                    <TabsPanelDisplay supplies={pattern.tools ?? []} type={"tool"} />
                                </div>
                                <div className={`${classes.sectionContainer}`}>
                                    <h2 className={classes.sectionHeader}>{t('otherSupplies')}</h2>
                                    <TabsPanelDisplay supplies={pattern.otherSupplies ?? []} type={"other supply"} />
                                </div>
                                <div className={classes.sectionContainer}>
                                    <h2 className={classes.sectionHeader}>{t('filesAndNotes')}</h2>
                                    <h3 className={classes.attributeName}>{t('files')}</h3>
                                    <FilesDisplay files={pattern.files} />
                                    <h3 className={classes.attributeName}>{t('counters')}</h3>
                                    <div className={classes.counters}>
                                        <CounterGroup parentId={pattern.id ?? ''} />
                                    </div>
                                    <h3 className={classes.attributeName}>{t('notes')}</h3>
                                    <div className={classes.notes}>
                                        <TextDisplay defaultValue={pattern.notes} />
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
async function loadPatternDetails(id: string) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}Pattern/${id}${process.env.REACT_APP_ENV === "dev" ? "" : ".json"}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + tokenLoader(),
        },
    });

    if (!response.ok) {
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