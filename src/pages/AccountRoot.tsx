import { Outlet } from 'react-router-dom';
import classes from './AccountRoot.module.scss';
import SidebarAccount from '../components/SidebarAccount';

export default function AccountRoot() {
  return (
    <div className={classes.container}>
      <SidebarAccount />
      <main>
        <Outlet />
      </main>
    </div>
  );
}