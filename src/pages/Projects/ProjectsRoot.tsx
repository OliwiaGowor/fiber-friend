import { Outlet } from 'react-router-dom';
import classes from './ProjectsRoot.module.scss';
import SidebarAccount from '../../components/SidebarAccount';

function ProjectsRoot() {
  return (
    <div className={classes.container}>
      <SidebarAccount />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default ProjectsRoot;