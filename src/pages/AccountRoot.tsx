import { Outlet } from 'react-router-dom';
import classes from './AccountRoot.module.scss';
import SidebarAccount from '../components/SidebarAccount';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function AccountRoot() {
  const isMobile = useMediaQuery('(max-width: 760px)');
  return (
    <div className={classes.container}>
      <SidebarAccount open={!isMobile}/>
      <main className={classes.mainContainer}>
        <Outlet />
      </main>
    </div>
  );
}