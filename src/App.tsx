import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage'
import Root from './pages/Root';
import Account, { loader as dataLoader } from './pages/Account';
import ProjectsRoot from './pages/Projects/ProjectsRoot';
import Projects, { loader as projectsLoader } from './pages/Projects/Projects';
import NewProjectPage from './pages/Projects/NewProjectPage';
import Patterns, { loader as patternsLoader } from './pages/Patterns/Patterns';
import PatternsRoot from './pages/Patterns/PatternsRoot';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProjectDetails, { loader as projectDetailsLoader } from './pages/Projects/ProjectDetails';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    id: 'root',
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'account',
        loader: dataLoader,
        element: <Account />,
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
        path: 'projects',
        element: <ProjectsRoot />,
        children: [
          {
            index: true,
            element: <Projects />,
            loader: projectsLoader,
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
                //path: 'edit',
                //element: <EditEventPage />,
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
        ],
      },
      {
        path: 'patterns',
        element: <PatternsRoot />,
        children: [
          {
            index: true,
            element: <Patterns />,
            loader: patternsLoader,
          }
        ]
      }
    ],
  },
]);


function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
