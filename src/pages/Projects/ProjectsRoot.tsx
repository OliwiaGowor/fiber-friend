import { Outlet } from 'react-router-dom';
import classes from './ProjectsRoot.module.scss';
import SidebarAccount from '../../components/SidebarAccount';

export default function ProjectsRoot() {
  return (
    <div className={classes.container}>
      <main>
        <Outlet />
      </main>
    </div>
  );
}