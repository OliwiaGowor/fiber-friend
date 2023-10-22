import { Suspense } from "react";
import { Await, defer, json, Link, useRouteLoaderData } from "react-router-dom";
import MiniaturesList from "../components/MiniaturesList/MiniaturesList";
import classes from './Account/Account.module.scss'
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

const AccountSettingsPage = () => {
  const { projects }: any = useRouteLoaderData('account');
  const pages = ['account', 'projects', 'patterns', 'orders'];

  return (
    <div className={classes.container}>
      <div className={classes.main}>
          <h1 className={classes.header}>Account settings</h1>
          Username: {}
          
      </div>
    </div>
  );
}

export default AccountSettingsPage;

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

export async function loader() {
  const [projects] = await Promise.all([
    loadProjects(),
  ]);

  return defer({
    projects,
  });
}