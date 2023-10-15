import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
export default function Root () {
    return (
    <>
    <Navbar />
    <main style={{position: 'relative', top: 'var(--navbar-height)'}}>
        <Outlet />
      </main>
    </>
    );
}
