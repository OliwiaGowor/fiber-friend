import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import classes from './PhotosDisplay.module.scss';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import Modal from '@mui/material/Modal';

//TODO: Moblie design
interface PhotosDisplayProps {
    data: any;
    miniatureSize?: string;
    zoomedSize?: string;
}

export default function PhotosDisplay(props: PhotosDisplayProps) {
    const { data, miniatureSize, zoomedSize, ...other } = props;
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const pagination = {
        clickable: true,
        renderBullet: function (index: number, className: string) {
            return '<span class="' + className + '">' + "</span>";
        },
    };

    const handlePhotoRender = (project: any, isZoomed: boolean) => {
        if (project.photos) {
            return (
                <div>
                    {project.photos.map((photo: any, index: number) => (
                        <SwiperSlide key={index} className={classes.addedPhoto}>
                            <img
                                className={classes.photo}
                                src={`${photo.url}`}
                                srcSet={`${photo.url}`}
                                alt="not found"
                                loading="lazy"
                                width={isZoomed ? (zoomedSize ? zoomedSize + 'px' : "749px") : (miniatureSize ? miniatureSize + 'px' : "449px")}
                                height={isZoomed ? (zoomedSize ? zoomedSize + 'px' : "749px") : (miniatureSize ? miniatureSize + 'px' : "449px")}
                            />
                        </SwiperSlide>
                    ))}
                </div>
            );
        } else {
            return (
                <SwiperSlide className={classes.addedPhoto}>
                    <InsertPhotoIcon sx={{ fontSize: isZoomed ? (zoomedSize ? zoomedSize : 749) : (miniatureSize ? miniatureSize : 449), color: 'grey', width: '100%', height: '100%' }} />
                </SwiperSlide>
            );
        }
    };

    return (
        <div className={classes.container}>
            <div className={classes.photosContainer} onClick={handleClickOpen}>
                <Swiper
                    pagination={pagination}
                    modules={[Pagination, Navigation]}
                    className={classes.photos}
                    navigation={true}
                    rewind={true}
                >
                    {handlePhotoRender(data, false)}
                </Swiper>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className={classes.modal}
            >
                <div className={classes.photosZoomed} onClick={handleClickOpen}>
                    <Swiper
                        pagination={pagination}
                        modules={[Pagination, Navigation]}
                        className={classes.photos}
                        navigation={true}
                        rewind={true}
                    >
                        {handlePhotoRender(data, true)}
                    </Swiper>
                </div>
            </Modal>
        </div>
    );
}