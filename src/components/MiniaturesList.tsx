import { Link } from "react-router-dom";
import classes from './MiniaturesList.module.scss'
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function MiniaturesList({ data , link}: any) {
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
        {loadedProjects.map((element: any, index: number) => (
          <SwiperSlide key={index} className={classes.loadedElement} style={{ height: '260px', width: '240px' }}>
            <Link to={`projects/${element.id}`}>
              <h2 className={classes.name}>{element.name}</h2>
              <img src={element.photoURL} alt={element.name} height='250px' width='250px' />
            </Link>
          </SwiperSlide>
        ))}
        <span style={{ display: 'block', height: '30px' }}></span>
      </Swiper>
    </div>
  );
}