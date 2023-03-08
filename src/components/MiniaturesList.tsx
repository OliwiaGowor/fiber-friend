import { Link } from "react-router-dom";
import classes from './MiniaturesList.module.scss'
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import AddCircleIcon from '@mui/icons-material/AddCircle';

function MiniaturesList({ data }: any) {

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
        rewind={true}
        breakpoints={{

          600: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          950: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1400: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        modules={[Navigation]}
        className="mySwiper"
      >
        <SwiperSlide className={classes.loadedElement}>
        <Link to={'new-project'}>
          <h2>New project</h2>
          <AddCircleIcon className={classes.addIcon} sx={{ fontSize: 100 }} />
        </Link>
        </SwiperSlide>
        {loadedProjects.map((element: any) => (
          <SwiperSlide key={element.id} className={classes.loadedElement}>
            <Link to={`/projects/${element.id}`}>
              <h2>{element.name}</h2>
              <img src={element.photoURL} alt={element.name} height='250px' width='250px' />
            </Link>
          </SwiperSlide>
        ))}
        <span style={{display: 'block', height: '30px'}}></span>
      </Swiper>
    </div>
  );

}


export default MiniaturesList;