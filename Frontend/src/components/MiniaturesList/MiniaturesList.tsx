import { Link, useNavigate } from "react-router-dom";
import classes from './MiniaturesList.module.scss'
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import React, { useEffect } from "react";

export default function MiniaturesList({ data, link, elementsType }: any) {
  const loadedElements = [];
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();
  const tileRef = React.useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);

  for (const key in data) {
    loadedElements.push({
      id: data[key].id,
      name: data[key].name,
      photos: data[key].photos,
    });
  }

  useEffect(() => {
    if (tileRef.current) {
      setWidth(tileRef.current.clientWidth);
      setHeight(tileRef.current.clientHeight);
    }
  }, [tileRef.current]);

  const handlePhotoRender = (element: any) => {
    if (element.photos && tileRef.current) {
      const mainPhoto = element?.photos[0] ? element?.photos[0] : element?.photos[1];

      return (
        <img
          className={classes.photo}
          src={`data:${mainPhoto?.type};base64,${mainPhoto?.content}`}
          alt={element.name}
          height={`${height}px`}
          width={`${width + 1}px`}
        />
      );
    } else {
      return (
        <InsertPhotoIcon
          className={classes.noPhotoIcon}
          sx={{ fontSize: 250, color: 'grey' }}
        />
      );
    }
  };

  return (
    <div className={classes.container}>
      <Swiper
        className="mySwiper"
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        breakpoints={{
          600: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          950: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1400: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        modules={[Navigation]}
      >
        <SwiperSlide className={classes.loadedElement} style={{ marginLeft: '20px' }}>
          <div
            className={`${classes.element} ${classes.addTile}`}
            onClick={() => navigate(`/fiber-friend/account/${link}`)}
          >
            <AddCircleIcon className={classes.addIcon} sx={{ fontSize: 100 }} />
            <h2 className={classes.info}>New project</h2>
          </div>
        </SwiperSlide>
        {loadedElements.map((element: any, index: number) => (
          <SwiperSlide
            key={element.id}
            className={classes.loadedElement}
            style={{ height: '260px', width: '240px' }}
          >
            <div
              className={classes.element}
              onClick={() => navigate(`${elementsType}/${element.id}`)}
              ref={tileRef}
            >
              {handlePhotoRender(element)}
              <span className={classes.gradient} />
              <div className={classes.info} >
                <h2 className={classes.name}>{element.name}</h2>
                {element.authorId !== userId &&
                  <h3 className={classes.author}>{element?.author?.username}</h3>
                }
              </div>
            </div>
          </SwiperSlide>
        ))}
        <span style={{ display: 'block', height: '30px' }} />
      </Swiper>
    </div>
  );
}
