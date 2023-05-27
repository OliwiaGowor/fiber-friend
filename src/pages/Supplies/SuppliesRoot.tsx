import { Outlet } from 'react-router-dom';
import classes from './SuppliesRoot.module.scss';

export default function SuppliesRoot() {
  return (
    <main className={classes.container}>
      <Outlet />
    </main>
  );
}