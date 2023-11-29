import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import classes from './Root.module.scss';
import ErrorPopup from "../components/ErrorPopup/ErrorPopup";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Root() {
  const isMobile = useMediaQuery('(max-width: 800px)');

  return (
    <>
      <Navbar />
      <main className={classes.main} >
        <Outlet />
      </main>
      <ErrorPopup />
      {!isMobile && <Footer />}
    </>
  );
}
