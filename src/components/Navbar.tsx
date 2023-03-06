import React from "react";
import { Link } from "react-router-dom";


function Navbar (){

    return (
        <div>
            <Link to={"/"}>Fiber Friend</Link>
            <Link to={"account"}>Account</Link>
        </div>
    );
}

export default Navbar;