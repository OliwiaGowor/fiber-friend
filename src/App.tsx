import './App.css';
import Navbar from './components/Navbar';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage'
import Root from './pages/Root';
import Account, {loader as dataLoader} from './pages/Account';
import ProjectsRoot from './pages/ProjectsRoot';
import Projects, {loader as projectsLoader} from './pages/Projects';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    id: 'root',
    children: [
      { index: true, 
        element: <HomePage /> },
      {
        path: 'account',
        loader: dataLoader,
        element: <Account />,
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
            id: 'project-detail',
            //loader: projectDetailLoader,
            children: [
              {
                index: true,
                //element: <ProjectDetailPage />,
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
            //path: 'new',
            //element: <NewEventPage />,
            //action: manipulateEventAction,
            //loader: checkAuthLoader,
          },
        ],
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
