import * as React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import useMediaQuery from '@mui/material/useMediaQuery';
import classes from './PhotosDisplay.module.scss';

//TODO: Moblie design
//TODO: add on fullscreen to either show original size or fit to screen
interface PhotosDisplayProps {
    data: any;
    miniatureSize?: string;
    zoomedSize?: string;
}

export default function PhotosDisplay(props: PhotosDisplayProps) {
    const { data, miniatureSize, zoomedSize, ...other } = props;
    const [open, setOpen] = React.useState(false);
    const isMobile = useMediaQuery('(max-width: 760px)');
    const windowWidth = React.useRef(window.innerWidth);
    const windowHeight = React.useRef(window.innerHeight);

    const vw = (percent: number) => {
        var w = Math.max(document.documentElement.clientWidth, windowWidth.current || 0);
        return (percent * w) / 100;
    }

    const displayWidth = (isZoomed: boolean) => {
        if (isMobile) {
            if (isZoomed) {
                return (windowWidth.current).toString() + "px";
            } else {
                return (windowWidth.current - vw(12)).toString() + "px";
            }
        } else {
            if (isZoomed) {
                return "749px";
            } else {
                return "449px";
            }
        }
    }

    const displayHeight = (isZoomed: boolean) => {
        if (isMobile) {
            if (isZoomed) {
                return (windowHeight.current).toString() + "px";
            } else {
                return (windowHeight.current / 2).toString() + "px";
            }
        } else {
            if (isZoomed) {
                return "749px";
            } else {
                return "449px";
            }
        }
    }

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
                    {project?.photos?.map((photo: any, index: number) => (
                        photo !== null && <SwiperSlide key={index} className={classes.photoSlide}>
                            <img
                                className={classes.photo}
                                src={`${photo?.url}`}
                                srcSet={`${photo?.url}`}
                                alt="not found"
                                loading="lazy"
                                width={displayWidth(isZoomed)}
                                height={displayHeight(isZoomed)}
                            />
                        </SwiperSlide>
                    ))}
                </div>
            );
        } else {
            return (
                <SwiperSlide className={classes.addedPhoto}>
                    <InsertPhotoIcon sx={{ fontSize: displayWidth(isZoomed), color: 'grey', width: '100%', height: '100%' }} />
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
            {open &&
                <span className={classes.closeIcon} onClick={handleClose}>
                    <CloseIcon sx={{ fontSize: '2rem' }} />
                </span>
            }
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className={classes.modal}
            >
                <Swiper
                    pagination={pagination}
                    modules={[Pagination, Navigation]}
                    className={classes.photos}
                    navigation={true}
                    rewind={true}
                >
                    {handlePhotoRender(data, true)}
                </Swiper>
            </Modal>
        </div>
    );
}