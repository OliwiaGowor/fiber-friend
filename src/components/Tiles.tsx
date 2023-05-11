import { Link } from "react-router-dom";
import classes from './Tiles.module.scss';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

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
        <img src={element.photos ? element.photos[0].url : element.photos} alt={element.name} height={isMobile ? '180px' : '270px'} width={isMobile ? '180px' : '270px'} />
      );
    } else {
      return (
        <InsertPhotoIcon sx={{ fontSize: isMobile ? 180 : 270, color: 'grey' }} />
      );
    }
  };

  return (
    <div className={classes.container}>
      <ul className={classes.elements}>
        <Link to={`${link}`}>
          <li className={classes.element}>
            <h2 className={classes.name}>{addText}</h2>
            <AddCircleIcon className={classes.addIcon} sx={{ fontSize: 100 }} />
          </li>
        </Link>
        {loadedProjects.map((element: any) => (
          <Link to={`${element.id}`}>
            <li key={element.id} className={classes.element}>
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
