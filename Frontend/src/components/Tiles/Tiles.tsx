import { Link } from "react-router-dom";
import classes from './Tiles.module.scss';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import FiltersBar from "../FiltersBar/FiltersBar";
//TODO: smaller tiles for mobile
interface TilesProps {
  fetchData: Function;
  link?: string;
  addText?: string;
  addTile: boolean;
  filters?: object[];
}

//`https://api.instantwebtools.net/v1/passenger?page=${currPage}&size=10`
function Tiles({ fetchData, link, addText, addTile, filters }: TilesProps) {
  const isMobile = useMediaQuery('(max-width: 760px)');
  const [loading, setLoading] = useState(false); // setting the loading state
  const [currPage, setCurrPage] = useState(1); // storing current page number
  const [elements, setElements] = useState<any>([]); // storing list
  const [wasLastList, setWasLastList] = useState(false); // setting a flag to know the last list
  const [chosenFilters, setChosenFilters] = useState(filters);
  const footer = document.getElementsByTagName('footer')[0];
  const pageSize = 2;


  const handleFetch = async () => {
    if (!wasLastList) {
      setLoading(true);
      const data = await fetchData(currPage + 1, pageSize, chosenFilters);

      //TODO:DELETE LATER
      const loadedProjects = [];
      for (const key in data) {
        loadedProjects.push({
          id: key,
          name: data[key].name,
          photos: data[key].photos,
        });
      }

      if (!loadedProjects.length) {
        setWasLastList(true);
        setLoading(false);
        return;
      }

      setElements([...elements, ...loadedProjects]);
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (!loading) {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const footerHeight = footer.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight - footerHeight - 200) {
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
      {filters && <FiltersBar filters={filters} applyFilters={setChosenFilters} />}
      <ul className={classes.elements}>
        {addTile &&
          <Link to={`${link}`}>
            <li className={classes.element}>
              <h2 className={classes.name}>{addText}</h2>
              <AddCircleIcon className={classes.addIcon} sx={{ fontSize: 100 }} aria-label="Add project" />
            </li>
          </Link>}
        {elements.map((element: any) => (
          <Link to={`${element.id}`} key={element.id}>
            <li className={classes.element}>
              <h2 className={classes.name}>{element.name}</h2>
              {handlePhotoRender(element)}
            </li>
          </Link>
        ))}
      </ul>
      {loading && <div>Loading...</div>}
    </div>
  );
}

export default Tiles;
