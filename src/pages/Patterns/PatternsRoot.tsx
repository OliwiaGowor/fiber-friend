import { Outlet } from 'react-router-dom';
import classes from './PatternsRoot.module.scss';

export default function PatternsRoot() {
  return (
    <main className={classes.container}>
      <Outlet />
    </main>
  );
}
