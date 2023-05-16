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
                    //action: deleteEventAction,
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
          }
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
