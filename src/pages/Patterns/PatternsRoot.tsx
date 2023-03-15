import { Outlet } from 'react-router-dom';
import classes from './PatternsRoot.module.scss';
import SidebarAccount from '../../components/SidebarAccount';

export default function PatternsRoot() {
  return (
    <div className={classes.container}>
      <SidebarAccount />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
