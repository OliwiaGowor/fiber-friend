import { LoaderFunctionArgs, Outlet, defer, redirect, useLocation, useRouteLoaderData } from 'react-router-dom';
import classes from './AccountRoot.module.scss';
import SidebarAccount from '../../components/SidebarAccount/SidebarAccount';
import useMediaQuery from '@mui/material/useMediaQuery';
import { tokenLoader } from '../../utils/auth';
import { handleRequest } from '../../utils/handleRequestHelper';
import { setError } from '../../reducers/errorSlice';

export default function AccountRoot() {
  const isMobile = useMediaQuery('(max-width: 800px)');

  return (
    <div className={classes.container}>
      <SidebarAccount open={!isMobile} />
      <main className={classes.mainContainer}>
        <Outlet />
      </main>
    </div>
  );
}

async function loadUserData(args: LoaderFunctionArgs) {
  try {
      const data = await handleRequest(
          `${process.env.REACT_APP_API_URL}User/UserData/${localStorage.getItem("userId")}`,
          "GET",
          "Could not fetch user. Please try again later.",
          tokenLoader(),
      );
     
      return data;

  } catch (error) {
       args.context.dispatch(setError(error));

      return null;
  }
}

export async function loader(args: LoaderFunctionArgs) {
  const userData = await loadUserData(args);
  
  return defer({
    userData: userData,
  });
}