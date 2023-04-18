import { Link } from "react-router-dom";
import classes from './Tiles.module.scss';
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface TilesProps {
  children?: React.ReactNode;
  data: any;
  link: string;
  addText: string;
}

function Tiles(props: TilesProps) {
  const { children, data, link, addText, ...other } = props;
  const loadedProjects = [];

  for (const key in data) {
    loadedProjects.push({
      id: parseInt(data[key].id),
      name: data[key].name,
      photos: data[key].photos,
    });
  }

  return (
    <div className={classes.container}>
      <ul className={classes.elements}>
        <Link to={`${link}`}>
          <li className={classes.element}>
            <h2 className={classes.name}>{addText}</h2>
            <AddCircleIcon className={classes.addIcon} sx={{ fontSize: 100 }}/>
          </li>
        </Link>
        {loadedProjects.map((element: any) => (
          <Link to={`${element.id}`}>
            <li key={element.id} className={classes.element}>
              <h2 className={classes.name}>{element.name}</h2>
              <img src={element.photos ? element.photos[0] : element.photos} alt={element.name} width='250px' height='270px' />
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}


export default Tiles;
