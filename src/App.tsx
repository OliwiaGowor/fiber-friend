import './App.css';
import Navbar from './components/Navbar';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage'
import Root from './pages/Root';
import Account, {loader as dataLoader} from './pages/Account';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    id: 'root',
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'account',
        loader: dataLoader,
        element: <Account />,
      },
      {
        path: 'projects',
        element: <Account />,

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
