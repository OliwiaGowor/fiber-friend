import { Outlet } from 'react-router-dom';
import classes from './CountersRoot.module.scss';

export default function CountersRoot () {
    return (
        <div className={classes.container}>
          <main>
            <Outlet />
          </main>
        </div>
      );
}