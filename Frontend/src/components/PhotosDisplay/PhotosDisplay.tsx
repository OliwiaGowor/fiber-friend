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
import FullScreenDisplay from '../FullScreenDisplay/FullScreenDisplay';

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

    React.useEffect(() => {
        const swiperWrapper = document.getElementsByClassName('swiper-wrapper')[2] as HTMLElement;

        if (swiperWrapper) {
            swiperWrapper.style.display = 'flex';
            swiperWrapper.style.alignItems = 'center';
        }
    }, []);

    const fileFromBase64 = (base64String: string, filename: string, mimeType: string) => {
        const byteString = atob(base64String);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);

        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: mimeType });
        return URL.createObjectURL(blob);
    }

    const vw = (percent: number) => {
        var w = Math.max(document.documentElement.clientWidth, windowWidth.current || 0);
        return (percent * w) / 100;
    }

    const displayWidth = () => {
        if (isMobile) {
            return (windowWidth.current - vw(12)).toString() + "px";
        } else {
            return "449px";
        }
    }

    const displayHeight = () => {
        if (isMobile) {
            return (windowHeight.current / 2).toString() + "px";
        } else {
            return "449px";
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
                                alt={`Image ${index + 1}`}
                                src={`data:${photo.type};base64,${photo.content}`}
                                loading="eager"
                                width={displayWidth()}
                                height={displayHeight()}
                            />
                        </SwiperSlide>
                    ))}
                </div>
            );
        } else {
            return (
                <SwiperSlide className={classes.addedPhoto}>
                    <InsertPhotoIcon sx={{ fontSize: displayWidth(), color: 'grey', width: '100%', height: '100%' }} />
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
                <button className={classes.closeIcon} onClick={handleClose}>
                    <CloseIcon sx={{ fontSize: '2rem' }} />
                </button>
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
                    modules={[Navigation]}
                    className={classes.photos}
                    navigation={true}
                    rewind={true}
                >
                    {data?.photos && <div>
                        {data?.photos?.map((photo: any, index: number) => (
                            photo !== null && <SwiperSlide key={index} className={classes.photoSlide}>
                                <FullScreenDisplay file={photo} />
                            </SwiperSlide>
                        ))}
                    </div>}
                </Swiper>
            </Modal>
        </div>
    );
}