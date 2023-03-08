import { Suspense } from "react";
import { Await, defer, json, Link, useLoaderData } from "react-router-dom";
import classes from './Tiles.module.scss';
import AddCircleIcon from '@mui/icons-material/AddCircle';

function Tiles({ data }: any) {
  const loadedProjects = [];

  for (const key in data) {
    loadedProjects.push({
      id: parseInt(data[key].id),
      name: data[key].name,
      photoURL: data[key].photoURL,
    });
  }

  return (
    <div className={classes.container}>
      <ul className={classes.elements}>
        <Link to={'new-project'}>
          <li className={classes.element}>
            <h2>New project</h2>
            <AddCircleIcon className={classes.addIcon} sx={{ fontSize: 100 }}/>
          </li>
        </Link>
        {loadedProjects.map((element: any) => (
          <Link to={`${element.id}`}>
            <li key={element.id} className={classes.element}>
              <h2>{element.name}</h2>
              <img src={element.photoURL} alt={element.name} width='250px' height='250px' />
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}


export default Tiles;
