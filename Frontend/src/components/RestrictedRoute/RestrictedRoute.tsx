import { Navigate, Route } from "react-router-dom";
import { tokenLoader } from "../../utils/auth";

interface RestrictedRouteProps {
    path: string;
    element: JSX.Element;
}

export const RestrictedRoute = ({path, element}: RestrictedRouteProps) => {
    const token = tokenLoader();

    return (
        <Route
            path={path}
            element={token ? element : <Navigate to="/fiber-friend/login" />}
        />
    )
}