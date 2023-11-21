import { Link } from "react-router-dom";
import classes from './Tiles.module.scss';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
//TODO: smaller tiles for mobile
interface TilesProps {
  children?: React.ReactNode;
  data: any;
  link: string;
  addText: string;
}

function Tiles(props: TilesProps) {
  const { children, data, link, addText, ...other } = props;
  const loadedProjects = [];
  const isMobile = useMediaQuery('(max-width: 760px)');

  for (const key in data) {
    loadedProjects.push({
      id: key,
      name: data[key].name,
      photos: data[key].photos,
    });
  }

  const handlePhotoRender = (element: any) => {
    if (element.photos) {
      return (
        <img
          src={element?.photos[0]?.url}
          alt={element.name}
          height={isMobile ? '180px' : '270px'}
          width={isMobile ? '180px' : '270px'}
        />
      );
    } else {
      return (
        <InsertPhotoIcon sx={{ fontSize: isMobile ? 180 : 270, color: 'grey' }} aria-label="Default photo" />
      );
    }
  };

  return (
    <div className={classes.container}>
      <ul className={classes.elements}>
        <Link to={`${link}`}>
          <li className={classes.element}>
            <h2 className={classes.name}>{addText}</h2>
            <AddCircleIcon className={classes.addIcon} sx={{ fontSize: 100 }} aria-label="Add project" />
          </li>
        </Link>
        {loadedProjects.map((element: any) => (
          <Link to={`${element.id}`} key={element.id}>
            <li className={classes.element}>
              <h2 className={classes.name}>{element.name}</h2>
              {handlePhotoRender(element)}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default Tiles;
