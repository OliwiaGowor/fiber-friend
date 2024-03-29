import React, { Suspense, useEffect, useState } from "react";
import { Await, Link } from "react-router-dom";
import { useTranslation } from 'react-i18next'; // Import useTranslation
import MiniaturesList from "../../components/MiniaturesList/MiniaturesList";
import classes from './Account.module.scss'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CircularProgress from "@mui/material/CircularProgress";
import CalculateIcon from '@mui/icons-material/Calculate';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import InsightsIcon from '@mui/icons-material/Insights';
import { tokenLoader } from "../../utils/auth";
import { handleRequest } from "../../utils/handleRequestHelper";
import { Project } from "../../DTOs/Project";
import { Pattern } from "../../DTOs/Pattern";
import { useAppDispatch } from "../../utils/hooks";
import { setError } from "../../reducers/errorSlice";

export default function Account() {
  const { t } = useTranslation("Account");
  const dispatch = useAppDispatch();
  const [projects, setProjects] = useState<Project[]>([]);
  const [patterns, setPatterns] = useState<Pattern[]>([]);

  const tiles = [
    {
      title: t('counters'),
      icon: <CalculateIcon
        className={classes.icon}
        sx={{ fontSize: 75 }}
      />,
      link: 'counters',
    },
    {
      title: t('resources'),
      icon: <ShoppingBasketIcon
        className={classes.icon}
        sx={{ fontSize: 75 }}
      />,
      link: 'resources',
    },
    {
      title: t('statistics'),
      icon: <InsightsIcon
        className={classes.icon}
        sx={{ fontSize: 75 }}
      />,
      link: 'statistics',
    },
  ];
  
  const handleLoadData = async () => {
    try {
      const patternData = await handleRequest(
        process.env.REACT_APP_API_URL === "prod" ? `${process.env.REACT_APP_API_URL}Project${process.env.REACT_APP_ENV === "dev" ? "" : ".json"}` :
          `${process.env.REACT_APP_API_URL}Pattern/GetPatternsForUser/${localStorage.getItem("userId")}?page=1&pageSize=10`,
        'GET',
        t('loadingErrorMessage'), 
        tokenLoader()
      );

      setPatterns(patternData);
    } catch (error) {
      dispatch(setError(error));
    }

    try {
      const projectData = await handleRequest(
        process.env.REACT_APP_API_URL === "prod" ? `${process.env.REACT_APP_API_URL}Project${process.env.REACT_APP_ENV === "dev" ? "" : ".json"}` :
          `${process.env.REACT_APP_API_URL}Project/GetProjectsForUser/${localStorage.getItem("userId")}?page=1&pageSize=10`,
        'GET',
        t('loadingErrorMessage'),
        tokenLoader()
      );

      setProjects(projectData);
    } catch (error) {
      dispatch(setError(error));
    }
  };

  useEffect(() => {
    handleLoadData();
  }, []);

  return (
    <div className={classes.container}>
      <Suspense fallback={<p style={{ textAlign: 'center' }}><CircularProgress /></p>}>
        <h1 className={classes.header}>
          <Link to={"projects"}>
            {t('projects')}<ArrowForwardIosIcon className={classes.arrow} />
          </Link>
        </h1>
        <Await resolve={projects}>
          {(loadedProjects) =>
            <MiniaturesList
              data={loadedProjects}
              link={'projects/new-project'}
              elementsType={'projects'}
              addText={t('addProject')}
            />
          }
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: 'center' }}><CircularProgress /></p>}>
        <h1 className={classes.header}>
          <Link to={"patterns"}>
            {t('patterns')}<ArrowForwardIosIcon className={classes.arrow} />
          </Link>
        </h1>
        <Await resolve={patterns}>
          {(loadedPatterns) =>
            <MiniaturesList
              data={loadedPatterns}
              link={'patterns/new-pattern'}
              elementsType={'patterns'}
              addText={t('addPattern')}
            />
          }
        </Await>
      </Suspense>
      <div className={classes.container} >
        <h1 className={classes.header}>{t('others')}</h1>
        <div className={classes.tiles} >
          {tiles.map((tile: any) =>
            <Link to={tile.link} key={tile.title}>
              <div className={classes.tile}>
                <h2 className={classes.name}>{tile.title}</h2>
                {tile.icon}
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
