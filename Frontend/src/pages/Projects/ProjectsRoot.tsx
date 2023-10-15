import { Outlet } from 'react-router-dom';
import classes from './ProjectsRoot.module.scss';
import SidebarAccount from '../../components/SidebarAccount/SidebarAccount';

export default function ProjectsRoot() {
  return (
    <main className={classes.container}>
      <Outlet />
    </main>
  );
}