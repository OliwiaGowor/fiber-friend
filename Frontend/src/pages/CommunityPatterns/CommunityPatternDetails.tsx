import React, { useState, useEffect, Suspense } from "react";
import {
  CircularProgress,
  useMediaQuery,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { Await, defer, useNavigate, useParams } from "react-router-dom";
import classes from './CommunityPatternDetails.module.scss';
import TabsPanelDisplay from "../../components/TabsPanelDisplay/TabsPanelDisplay";
import EditIcon from '@mui/icons-material/Edit';
import { useAppDispatch } from '../../utils/hooks';
import { handleRequest } from "../../utils/handleRequestHelper";
import { setError } from "../../reducers/errorSlice";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PatternPdf } from "../../components/PatternPdf/PatternPdf";
import { Pattern } from "../../DTOs/Pattern";
import { useTranslation } from "react-i18next";
import { tokenLoader } from "../../utils/auth";
import PhotosDisplay from "../../components/PhotosDisplay/PhotosDisplay";
import { FilesDisplay } from "../../components/FilesDisplay/FilesDisplay";
import TextDisplay from "../../components/TextEditor/TextDisplay";

export default function CommunityPatternDetails() {
  const { t } = useTranslation("CommunityPatternDetails");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { communityPatternId } = useParams();
  const [pattern, setPattern] = useState<Pattern>({} as Pattern);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const isMobile = useMediaQuery('(max-width: 760px)');

  const token = tokenLoader();

  const fetchPattern = async (id: string) => {
    try {
      const patternData = await handleRequest(
        `${process.env.REACT_APP_API_URL}Pattern/${id}${process.env.REACT_APP_ENV === "dev" ? "" : ".json"}`,
        'GET',
        t('fetchPatternError'),
        token
      );
      setPattern(patternData);
    } catch (error) {
      dispatch(setError(error));
    }
  };

  useEffect(() => {
    if (communityPatternId) {
      fetchPattern(communityPatternId);
    }
  }, [communityPatternId]);

  useEffect(() => {
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

  const handleDelete = async () => {
    try {
      await handleRequest(
        `${process.env.REACT_APP_API_URL}Pattern/${pattern.id}${process.env.REACT_APP_ENV === "dev" ? "" : ".json"}`,
        'DELETE',
        t('deletePatternError'),
        token
      );
      return navigate('/fiber-friend/account/projects');
    } catch (error) {
      dispatch(setError(error));
    }
  };

  useEffect(() => {
    if (pattern) {
      sessionStorage.setItem('patternData', JSON.stringify(pattern));
    }
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
                }}>
                  <PDFDownloadLink document={<PatternPdf />} fileName={`${pattern.name}.pdf`}>
                    {t('generatePDF')}
                  </PDFDownloadLink>
                </MenuItem>
                <MenuItem onClick={() => {
                  handleClose();
                  return navigate('/fiber-friend/account/patterns/' + pattern.id + '/edit');
                }}>
                  {t('edit')}
                </MenuItem>
                <MenuItem onClick={() => { handleClose(); handleDelete(); }}>
                  {t('deletePattern')}
                </MenuItem>
              </Menu>
            </div>
            <div className={classes.dividedContainer}>
              <div className={classes.leftElements}>
                <div className={`${classes.sectionContainer} ${classes.topContainer}`}>
                  <h2 className={classes.sectionHeader}>{t('detailsSection')}</h2>
                  <div className={classes.projectInfoContainer}>
                    <div className={classes.attributeName}>{t('author')}: </div>
                    {pattern?.author?.username ?? <br></br>}
                    <div className={classes.attributeName}>{t('type')}: </div>
                    {pattern.type ?? <br></br>}
                    <div className={classes.attributeName}>{t('category')}: </div>
                    {pattern.category ?? <br></br>}
                  </div>
                </div>
              </div>
              <div className={classes.rightElements}>
                <div className={`${classes.sectionContainer} ${classes.photosSection}`}>
                  {!isMobile && <h2 className={classes.sectionHeader}>{t('photosSection')}</h2>}
                  <PhotosDisplay data={pattern} />
                </div>
              </div>
            </div>
            <div className={classes.wholeScreenElements}>
              <div className={`${classes.sectionContainer}`}>
                <h2 className={classes.sectionHeader}>{t('yarnsSection')}</h2>
                <TabsPanelDisplay supplies={pattern.yarns ?? []} type={"yarn"} />
              </div>
              <div className={`${classes.sectionContainer}`}>
                <h2 className={classes.sectionHeader}>{t('toolsSection')}</h2>
                <TabsPanelDisplay supplies={pattern.tools ?? []} type={"tool"} />
              </div>
              <div className={`${classes.sectionContainer}`}>
                <h2 className={classes.sectionHeader}>{t('otherSuppliesSection')}</h2>
                <TabsPanelDisplay supplies={pattern.otherSupplies ?? []} type={"other supply"} />
              </div>
              <div className={classes.sectionContainer}>
                <h2 className={classes.sectionHeader}>{t('filesAndNotesSection')}</h2>
                <h3 className={classes.attributeName}>{t('filesSection')}</h3>
                <FilesDisplay files={pattern.files} />
                <h3 className={classes.attributeName}>{t('notesSection')}</h3>
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
