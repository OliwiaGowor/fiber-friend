import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import classes from './Root.module.scss';

export default function Root() {
  return (
    <>
      <Navbar />
      <main className={classes.main} >
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
