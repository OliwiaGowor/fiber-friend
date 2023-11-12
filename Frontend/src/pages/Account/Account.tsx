import { Suspense } from "react";
import { Await, defer, json, Link, useRouteLoaderData } from "react-router-dom";
import MiniaturesList from "../../components/MiniaturesList/MiniaturesList";
import classes from './Account.module.scss'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CircularProgress from "@mui/material/CircularProgress";
import CalculateIcon from '@mui/icons-material/Calculate';

const tiles = [
  {
    title: "Counters",
    icon: <CalculateIcon />,
    link: 'counters',
  },
  {
    title: "Supplies",
    icon: <CalculateIcon />,
    link: 'supplies',
  },
];

export default function Account() {
  const { projects, patterns, orders }: any = useRouteLoaderData('account');
  const pages = ['account', 'projects', 'patterns', 'orders'];

  return (
    <div className={classes.container}>
      <Suspense fallback={<p style={{ textAlign: 'center' }}><CircularProgress /></p>}>
        <h1 className={classes.header}>
          <Link to={"projects"}>
            PROJECTS<ArrowForwardIosIcon className={classes.arrow} />
          </Link>
        </h1>
        <Await resolve={projects}>
          {(loadedProjects) => <MiniaturesList data={loadedProjects} link={'projects/new-project'} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: 'center' }}><CircularProgress /></p>}>
        <h1 className={classes.header}>
          <Link to={"patterns"}>
            PATTERNS<ArrowForwardIosIcon className={classes.arrow} />
          </Link>
        </h1>
        <Await resolve={patterns}>
          {(loadedPatterns) => <MiniaturesList data={loadedPatterns} link={'patterns/new-pattern'} />}
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

async function fetchData(url: string) {
  const response = await fetch(url);

  if (!response.ok) {
    throw json(
      { message: `Could not fetch data from ${url}.` },
      {
        status: 500,
      }
    );
  }

  return response.json();
}

async function loadProjects() {
  return fetchData('https://fiber-frined-default-rtdb.europe-west1.firebasedatabase.app/projects.json');
}

async function loadPatterns() {
  return fetchData('https://fiber-frined-default-rtdb.europe-west1.firebasedatabase.app/patterns.json');
}

async function loadOrders() {
  return fetchData('https://fiber-frined-default-rtdb.europe-west1.firebasedatabase.app/orders.json');
}

export async function loader() {
  const [projects, patterns, orders] = await Promise.all([
    loadProjects(),
    loadPatterns(),
    loadOrders()
  ]);

  return defer({
    projects,
    patterns,
    orders,
  });
}