import { Outlet } from 'react-router-dom';
import classes from './PatternsRoot.module.scss';

export default function PatternsRoot() {
  return (
    <div className={classes.container}>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
