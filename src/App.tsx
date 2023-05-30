import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage'
import Root from './pages/Root';
import Account, { loader as dataLoader } from './pages/Account';
import Projects, { loader as projectsLoader } from './pages/Projects/Projects';
import NewProjectPage from './pages/Projects/NewProjectPage';
import Patterns, { loader as patternsLoader } from './pages/Patterns/Patterns';
import PatternsRoot from './pages/Patterns/PatternsRoot';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProjectDetails, { loader as projectDetailsLoader } from './pages/Projects/ProjectDetails';
import PatternDetails, { loader as patternDetailsLoader } from './pages/Patterns/PatternDetails';
import AccountRoot from './pages/AccountRoot';
import NewPatternPage from './pages/Patterns/NewPatternPage';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import ProjectsRoot from './pages/Projects/ProjectsRoot';
import CountersRoot from './pages/Counters/CountersRoot';
import Counters, { loader as countersLoader } from './pages/Counters/Counters';
import NewCounter from './pages/Counters/NewCounter';
import EditProject from './pages/Projects/EditProject';
import RecoverPassPage from './pages/RecoverPassPage';
import CounterDetails, { loader as counterDetailsLoader }  from './pages/Counters/CounterDetails';
import EditCounter from './pages/Counters/EditCounter';
import Supplies, { loader as suppliesLoader } from './pages/Supplies/Supplies';
import SuppliesRoot from './pages/Supplies/SuppliesRoot';
import NewSupplyPage from './pages/Supplies/NewSupplyPage';

const router = createBrowserRouter([
  {
    path: '/fiber-friend',
    element: <Root />,
    id: 'root',
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'signUp',
        element: <SignUpPage />
      },
      {
        path: 'recover-password',
        element: <RecoverPassPage />
      },
      {
        path: 'account',
        loader: dataLoader,
        id: 'account',
        element: <AccountRoot />,
        children: [
          {
            index: true,
            element: <Account />,
          },
          {
            path: 'projects',
            id: "projects",
            loader: projectsLoader,
            element: <ProjectsRoot />,
            children: [
              {
                index: true,
                element: <Projects />,
              },
              {
                path: ':projectId',
                id: 'project-details',
                loader: projectDetailsLoader,
                children: [
                  {
                    index: true,
                    element: <ProjectDetails />,
                  },
                  {
                    path: 'edit',
                    element: <EditProject />,
                    //action: manipulateEventAction,
                    //loader: checkAuthLoader,
                  },

                ],
              },
              {
                path: 'new-project',
                element: <NewProjectPage />,
                //action: manipulateProjectAction,
                //loader: checkAuthLoader,
              },
            ]
          },
          {
            path: 'patterns',
            element: <PatternsRoot />,                
            loader: patternsLoader,
            id: 'patterns',
            children: [
              {
                index: true,
                element: <Patterns />,

              },
              {
                path: ':patternId',
                id: 'pattern-details',
                loader: patternDetailsLoader,
                children: [
                  {
                    index: true,
                    element: <PatternDetails />,
                  },
                  /*{
                    path: 'edit',
                    element: <EditPattern />,
                    //action: manipulateEventAction,
                    //loader: checkAuthLoader,
                  },*/

                ],
              },
              {
                path: 'new-pattern',
                element: <NewPatternPage />
              }
            ]
          },
          {
            path: 'counters',
            element: <CountersRoot />,
            id: 'counters',
            loader: countersLoader,
            children: [
              {
                index: true,
                element: <Counters />, 
              },
              {
                path: 'new-counter',
                element: <NewCounter />,
                //action: manipulateProjectAction,
                //loader: checkAuthLoader,
              },
              {
                path: ':counterId',
                id: 'counter-details',
                loader: counterDetailsLoader,
                children: [
                  {
                    index: true,
                    element: <CounterDetails />,
                    //action: deleteEventAction,
                  },
                  {
                    path: 'edit',
                    element: <EditCounter />,
                    //action: manipulateEventAction,
                    //loader: checkAuthLoader,
                  },

                ],
              },
            ]
          },
          {
            path: 'supplies',
            id: "supplies",
            loader: suppliesLoader,
            element: <SuppliesRoot />,
            children: [
              {
                index: true,
                element: <Supplies />,
              },
              /*{
                path: ':projectId',
                id: 'project-details',
                loader: projectDetailsLoader,
                children: [
                  {
                    index: true,
                    element: <ProjectDetails />,
                  },
                  {
                    path: 'edit',
                    element: <EditProject />,
                    //action: manipulateEventAction,
                    //loader: checkAuthLoader,
                  },

                ],
              },*/
              {
                path: 'new-supply',
                element: <NewSupplyPage />,
                //action: manipulateProjectAction,
                //loader: checkAuthLoader,
              },
            ]
          },
        ]
      },
    ],
  },
]);


function App() {
  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RouterProvider router={router} />
      </LocalizationProvider>
    </div>
  );
}

export default App;
