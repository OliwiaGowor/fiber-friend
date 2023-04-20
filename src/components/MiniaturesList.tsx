import { Link } from "react-router-dom";
import classes from './MiniaturesList.module.scss'
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

export default function MiniaturesList({ data, link }: any) {
  const loadedElements = [];

  for (const key in data) {
    loadedElements.push({
      id: parseInt(data[key].id),
      name: data[key].name,
      photos: data[key].photos,
    });
  }

  const handlePhotoRender = (element: any) => {
    if (element.photos) {
      return (
        <img src={element.photos ? element.photos[0] : element.photos} alt={element.name} height='250px' width='250px' />
      );
    } else {
      return (
        <InsertPhotoIcon sx={{ fontSize: 250, color: 'grey' }} />
      );
    }
  };

  return (
    <div className={classes.container}>
      <Swiper
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
        className="mySwiper"
      >
        <SwiperSlide className={classes.loadedElement} style={{ marginLeft: '20px' }}>
          <Link to={`/fiber-friend/account/${link}`}>
            <h2>New project</h2>
            <AddCircleIcon className={classes.addIcon} sx={{ fontSize: 100 }} />
          </Link>
        </SwiperSlide>
        {loadedElements.map((element: any, index: number) => (
          <SwiperSlide key={index} className={classes.loadedElement} style={{ height: '260px', width: '240px' }}>
            <Link to={`projects/${element.id}`}>
              <h2 className={classes.name}>{element.name}</h2>
              {handlePhotoRender(element)}
            </Link>
          </SwiperSlide>
        ))}
        <span style={{ display: 'block', height: '30px' }}></span>
      </Swiper>
    </div>
  );
}
