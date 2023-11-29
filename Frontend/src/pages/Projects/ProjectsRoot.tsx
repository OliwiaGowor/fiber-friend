import { Outlet } from 'react-router-dom';
import classes from './ProjectsRoot.module.scss';

export default function ProjectsRoot() {
  return (
    <main className={classes.container}>
      <Outlet />
    </main>
  );
}