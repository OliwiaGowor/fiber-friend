import { Suspense } from "react";
import { Await, defer, json, Link, useLoaderData } from "react-router-dom";
import MiniaturesList from "../components/MiniaturesList";
import SidebarAccount from "../components/SidebarAccount";
import classes from './Account.module.scss'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

function Account() {
  const { projects, patterns, orders }: any = useLoaderData();
  const pages = ['account', 'projects', 'patterns', 'orders'];

  return (
    <div className={classes.container}>
      <SidebarAccount />
      <div>
        <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
          <Link to={"/projects"}>
            <h1 className={classes.header}>PROJECTS<ArrowForwardIosIcon className={classes.arrow}/></h1>
          </Link>
          <Await resolve={projects}>
            {(loadedProjects) => <MiniaturesList data={loadedProjects} />}
          </Await>
        </Suspense>
        <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
          <Link to={"/patterns"}>
            <h1 className={classes.header}>PATTERNS<ArrowForwardIosIcon className={classes.arrow}/></h1>
          </Link>
          <Await resolve={patterns}>
            {(loadedPatterns) => <MiniaturesList data={loadedPatterns} />}
          </Await>
        </Suspense>
        <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
          <h1 className={classes.header}>ORDERS<ArrowForwardIosIcon className={classes.arrow}/></h1>
          <Await resolve={orders}>
            {(loadedOrders) => <MiniaturesList data={loadedOrders} />}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}


export default Account;


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