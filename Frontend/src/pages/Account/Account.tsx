import { Suspense, useEffect, useState } from "react";
import { Await, defer, json, Link, redirect, useLocation, useRouteLoaderData } from "react-router-dom";
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

const tiles = [
  {
    title: "Counters",
    icon: <CalculateIcon
      className={classes.icon}
      sx={{ fontSize: 75 }}
    />,
    link: 'counters',
  },
  {
    title: "Resources",
    icon: <ShoppingBasketIcon
      className={classes.icon}
      sx={{ fontSize: 75 }}
    />,
    link: 'resources',
  },
  {
    title: "Statistics",
    icon: <InsightsIcon
      className={classes.icon}
      sx={{ fontSize: 75 }}
    />,
    link: 'statistics',
  },
];

export default function Account() {
  const dispatch = useAppDispatch();
  const [projects, setProjects] = useState<Project[]>([]);
  const [patterns, setPatterns] = useState<Pattern[]>([]);

  const handleLoadData = async () => {
    try {
      const patternData = await handleRequest(
        process.env.REACT_APP_API_URL === "prod" ? `${process.env.REACT_APP_API_URL}Project${process.env.REACT_APP_ENV === "dev" ? "" : ".json"}` :
          `${process.env.REACT_APP_API_URL}Pattern/GetPatternsForUser/${localStorage.getItem("userId")}?page=1&pageSize=10`,
        'GET',
        "Could not load patterns. Please try again later.",
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
        "Could not load projects. Please try again later.",
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
            PROJECTS<ArrowForwardIosIcon className={classes.arrow} />
          </Link>
        </h1>
        <Await resolve={projects}>
          {(loadedProjects) =>
            <MiniaturesList
              data={loadedProjects}
              link={'projects/new-project'}
              elementsType={"projects"}
            />
          }
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: 'center' }}><CircularProgress /></p>}>
        <h1 className={classes.header}>
          <Link to={"patterns"}>
            PATTERNS<ArrowForwardIosIcon className={classes.arrow} />
          </Link>
        </h1>
        <Await resolve={patterns}>
          {(loadedPatterns) =>
            <MiniaturesList
              data={loadedPatterns}
              link={'patterns/new-pattern'}
              elementsType={"patterns"}
            />
          }
        </Await>
      </Suspense>
      <div className={classes.container} >
        <h1 className={classes.header}>OTHERS</h1>
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