import { Outlet, redirect, useLocation } from 'react-router-dom';
import classes from './AccountRoot.module.scss';
import SidebarAccount from '../../components/SidebarAccount/SidebarAccount';
import useMediaQuery from '@mui/material/useMediaQuery';
import { tokenLoader } from '../../utils/auth';
import { useEffect } from 'react';

export default function AccountRoot() {
  const isMobile = useMediaQuery('(max-width: 800px)');

  return (
    <div className={classes.container}>
      <SidebarAccount open={!isMobile} />
      <main className={classes.mainContainer}>
        <Outlet />
      </main>
    </div>
  );
}