import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import classes from './Root.module.scss';
import ErrorPopup from "../components/ErrorPopup/ErrorPopup";

export default function Root() {
  return (
    <>
      <Navbar />
      <main className={classes.main} >
        <Outlet />
      </main>
      <ErrorPopup />
      <Footer />
    </>
  );
}
