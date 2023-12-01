import { Link, useNavigate } from "react-router-dom";
import classes from './Tiles.module.scss';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import FiltersBar from "../FiltersBar/FiltersBar";
import { CommunityPattern, Pattern } from "../../DTOs/Pattern";
import React from "react";

interface TilesProps {
  fetchData: Function;
  link?: string;
  addText?: string;
  addTile: boolean;
  filters?: object[];
}

//`https://api.instantwebtools.net/v1/passenger?page=${currPage}&size=10`
function Tiles({ fetchData, link, addText, addTile, filters }: TilesProps) {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 800px)');
  const userId = localStorage.getItem('userId');
  const [loading, setLoading] = useState(false); // setting the loading state
  const [currPage, setCurrPage] = useState(1); // storing current page number
  const [elements, setElements] = useState<Pattern[] | CommunityPattern[]>([]); // storing list
  const [wasLastList, setWasLastList] = useState(false); // setting a flag to know the last list
  const [chosenFilters, setChosenFilters] = useState(filters);
  const tileRef = React.useRef<HTMLLIElement | null>(null);
  const footer = document.getElementsByTagName('footer')[0];
  const pageSize = 2;


  const handleFetch = async () => {
    if (!wasLastList) {
      setLoading(true);
      const data = await fetchData(currPage + 1, pageSize, chosenFilters);
      if (data) {
        console.log(data)
        //TODO: delete later
        const dataArray = Object.values(data).map((e: any) => {
          return e;
        });

        if (!dataArray.length) {
          setWasLastList(true);
          setLoading(false);
          return;
        }

        setElements([...elements, ...dataArray]);
        setLoading(false);
        
      } else {
        setWasLastList(true);
          setLoading(false);
          return;
      }
    };
  }

  const handleScroll = () => {
    if (!loading && document?.documentElement) {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const footerHeight = footer?.clientHeight ?? 0 + 200;

      if (isMobile && scrollTop + clientHeight >= scrollHeight) {
        handleFetch();
      } else if (scrollTop + clientHeight >= scrollHeight - footerHeight) {
        handleFetch();
      }
    }
  };

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    handleFetch();
  }, []);

  useEffect(() => {
    fetchData(currPage, pageSize, chosenFilters);
  }, [chosenFilters]);

  const handlePhotoRender = (element: any) => {
    if (element.photos && tileRef.current) {
      const mainPhoto = element?.photos[0] ? element?.photos[0] : element?.photos[1]
      const img = new Image();
      img.src = mainPhoto.src;

      let newWidth = tileRef.current.clientWidth;
      let newHeight = tileRef.current.clientHeight;

      return (
        <img
          className={classes.photo}
          src={mainPhoto.src}
          alt={element.name}
          height={`${newHeight}px`}
          width={`${newWidth + 1}px`}
        />
      );
    } else {
      return (
        <InsertPhotoIcon
          className={classes.noPhotoIcon}
          sx={{ fontSize: isMobile ? 180 : 270, color: 'grey' }}
          aria-label="Default photo" />
      );
    }
  };

  return (
    <div className={classes.container}>
      {filters && <FiltersBar filters={filters} applyFilters={setChosenFilters} />}
      <ul className={classes.elements}>
        {addTile &&
          <li className={classes.element} onClick={() => navigate(`${link}`)}>
            <h2 className={classes.name}>{addText}</h2>
            <AddCircleIcon className={classes.addIcon} sx={{ fontSize: 100 }} aria-label="Add project" />
          </li>
        }
        {elements.map((element: any) => (
          <li
            className={classes.element}
            key={element.id}
            onClick={() => navigate(`${element.id}`)}
            ref={tileRef}
          >
            {handlePhotoRender(element)}
            <span className={classes.gradient}></span>
            <div className={classes.info} >
              <h2 className={classes.name}>{element.name}</h2>
              {element.authorId !== userId &&
                <h3 className={classes.author}>{element?.author?.username}</h3>
              }
            </div>
          </li>
        ))}
      </ul>
      {loading && <div>Loading...</div>}
    </div>
  );
}

export default Tiles;
