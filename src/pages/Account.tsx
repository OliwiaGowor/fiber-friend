import { Suspense } from "react";
import { Await, defer, json, Link, useRouteLoaderData } from "react-router-dom";
import MiniaturesList from "../components/MiniaturesList";
import classes from './Account.module.scss'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CircularProgress from "@mui/material/CircularProgress";

export default function Account() {
  const { projects, patterns, orders }: any = useRouteLoaderData('account');
  const pages = ['account', 'projects', 'patterns', 'orders'];

  return (
    <div className={classes.container}>
      <Suspense fallback={<p style={{ textAlign: 'center' }}><CircularProgress /></p>}>
        <Link to={"/acount/projects"}>
          <h1 className={classes.header}>PROJECTS<ArrowForwardIosIcon className={classes.arrow} /></h1>
        </Link>
        <Await resolve={projects}>
          {(loadedProjects) => <MiniaturesList data={loadedProjects} link={'projects/new-project'} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: 'center' }}><CircularProgress /></p>}>
        <Link to={"/acount/patterns"}>
          <h1 className={classes.header}>PATTERNS<ArrowForwardIosIcon className={classes.arrow} /></h1>
        </Link>
        <Await resolve={patterns}>
          {(loadedPatterns) => <MiniaturesList data={loadedPatterns} link={'patterns/new-pattern'}/>}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: 'center' }}><CircularProgress /></p>}>
        <h1 className={classes.header}>ORDERS<ArrowForwardIosIcon className={classes.arrow} /></h1>
        <Await resolve={orders}>
          {(loadedOrders) => <MiniaturesList data={loadedOrders} />}
        </Await>
      </Suspense>
    </div>
  );
}

async function loadProjects() {
  const response = await fetch('https://fiber-frined-default-rtdb.europe-west1.firebasedatabase.app/projects.json');

  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch events.' };
    // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
    //   status: 500,
    // });
    throw json(
      { message: 'Could not fetch projects.' },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();

    return resData;
  }
}

async function loadPatterns() {
  const response = await fetch('https://fiber-frined-default-rtdb.europe-west1.firebasedatabase.app/projects.json');

  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch events.' };
    // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
    //   status: 500,
    // });
    throw json(
      { message: 'Could not fetch projects.' },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData;
  }
}

async function loadOrders() {
  const response = await fetch('https://fiber-frined-default-rtdb.europe-west1.firebasedatabase.app/projects.json');

  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch events.' };
    // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
    //   status: 500,
    // });
    throw json(
      { message: 'Could not fetch projects.' },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData;
  }
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