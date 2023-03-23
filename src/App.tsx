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
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'signUp',
        element: <SignUpPage />
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
            ]
          },


          {
            path: 'patterns',
            element: <PatternsRoot />,
            children: [
              {
                index: true,
                element: <Patterns />,
                loader: patternsLoader,
              },
              {
                path: 'new-pattern',
                element: <NewPatternPage />
              }
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
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
