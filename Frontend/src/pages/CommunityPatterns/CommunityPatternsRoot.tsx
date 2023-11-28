import { Outlet } from 'react-router-dom';
import classes from './CommunityPatternsRoot.module.scss';

export default function CommunityPatternsRoot() {
  return (
    <main className={classes.container}>
      <Outlet />
    </main>
  );
}
