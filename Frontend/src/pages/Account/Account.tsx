import { Suspense, useEffect } from "react";
import { Await, defer, json, Link, redirect, useLocation, useRouteLoaderData } from "react-router-dom";
import MiniaturesList from "../../components/MiniaturesList/MiniaturesList";
import classes from './Account.module.scss'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CircularProgress from "@mui/material/CircularProgress";
import CalculateIcon from '@mui/icons-material/Calculate';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import InsightsIcon from '@mui/icons-material/Insights';
import { tokenLoader } from "../../utils/auth";

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
  const { projects, patterns }: any = useRouteLoaderData('account');
  const pages = ['account', 'projects', 'patterns'];

  
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
            <MiniaturesList data={loadedProjects} link={'projects/new-project'} />}
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
            <MiniaturesList data={loadedPatterns} link={'patterns/new-pattern'} />}
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
//TODO: move up, because it loads everytime
async function fetchData(url: string) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  const token = tokenLoader();

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    method: 'GET',
    headers,
  });

  const resData = await response.json();

  return resData;
}

async function loadProjects() {
  const url = process.env.REACT_APP_API_URL === "prod" ? `${process.env.REACT_APP_API_URL}Project${process.env.REACT_APP_ENV === "dev" ? "" : ".json"}` :
  `${process.env.REACT_APP_API_URL}Project/GetAllProjectsForUser/${localStorage.getItem("userId")}`;
  return fetchData(url);
}

async function loadPatterns() {
  const url = process.env.REACT_APP_API_URL === "prod" ? `${process.env.REACT_APP_API_URL}Project${process.env.REACT_APP_ENV === "dev" ? "" : ".json"}` :
  `${process.env.REACT_APP_API_URL}Pattern/GetAllPatternsForUser/${localStorage.getItem("userId")}`;
  return fetchData(url);
}

export async function loader() {
  const token = tokenLoader();

      if (!token ) {
          return redirect("/fiber-friend/login");
      }


  const [projects, patterns] = await Promise.all([
    loadProjects(),
    loadPatterns(),
  ]);

  return defer({
    projects,
    patterns,
  });
}