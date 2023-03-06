import { Link } from "react-router-dom";

function SidebarAccount () {

    return (
        <div>
            <ul>
                <li>
                    <Link to={"/account"}>Account</Link>
                </li>
                <li>
                    <Link to={"/projects"}>Projects</Link>
                </li>
                <li>
                    <Link to={"/"}>Patterns</Link>
                </li>
            </ul>
            
        </div>
    );

}

export default SidebarAccount;