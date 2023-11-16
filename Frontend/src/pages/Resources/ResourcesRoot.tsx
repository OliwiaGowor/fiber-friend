import { Outlet } from 'react-router-dom';
import classes from './ResourcesRoot.module.scss';

export default function ResourcesRoot() {
  return (
    <main className={classes.container}>
      <Outlet />
    </main>
  );
}