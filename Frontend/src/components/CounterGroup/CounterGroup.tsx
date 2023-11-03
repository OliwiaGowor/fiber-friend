import * as React from 'react';
import classes from "./CounterGroup.module.scss";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import BigCounter from '../BigCounter/BigCounter';
import CounterMiniature from '../CounterMiniature/CounterMiniature';
import { UnsavedPrompt } from '../UnsavedPrompt/UnsavedPrompt';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
//TODO: save counter button logic
//TODO: smaller tiles on mobile and horizontal scroll
//FIXME: fix dialog on mobile
const CounterGroup = () => {
    const [tmpCounter, setTmpCounter] = React.useState();
    const [counters, setCounters] = React.useState<any>([]);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [editingCounters, setEditingCounters] = React.useState<boolean>(false);

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const addCounter = (counter: any) => {
        setCounters([...counters, counter]);
    }

    const handleDeleteCounter = (counter: any) => {
        let tmpArray = counters.filter((c: any) =>
            c.id !== counter.id);

        for (let i = 0; i < tmpArray.length; i++) {
            tmpArray[i].id = i;
        }
        setCounters(tmpArray);
    };

    const handleSaveChanges = () => {
        setEditingCounters(false);
    }

    return (
        <div className={classes.container} >
            <UnsavedPrompt hasUnsavedChanges={editingCounters} />
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Add counter</DialogTitle>
                <DialogContent>
                    <BigCounter getCounter={setTmpCounter} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button
                        onClick={() => {
                            addCounter((tmpCounter));
                            handleCloseDialog();
                        }}
                    >
                        Enter
                    </Button>
                </DialogActions>
            </Dialog>
            <Swiper
                slidesPerView={1}
                spaceBetween={20}
                navigation={true}
                breakpoints={{
                    600: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    950: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                    1400: {
                        slidesPerView: 5,
                        spaceBetween: 20,
                    },
                }}
                modules={[Navigation]}
                className={classes.counters}
            >
                <SwiperSlide className={classes.element}>
                    <Button
                        className={classes.addButton}
                        variant='contained'
                        onClick={() => {
                            handleClickOpen();
                            setEditingCounters(true);
                        }}
                    >
                        <h2 className={classes.name}>Add counter</h2>
                        <AddCircleIcon className={classes.addIcon} sx={{ fontSize: 80 }} />
                    </Button>
                </SwiperSlide>
                {counters!.map((counter: any, index: number) => (
                    <SwiperSlide key={index} className={classes.loadedElement} style={{ height: '240px', width: '240px' }}>
                        <div className={classes.counter} key={index}>
                            <CounterMiniature
                                editable={true}
                                counter={counter}
                                deleteCounter={() => { handleDeleteCounter(counter) }}
                                boxShadow={false}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            {editingCounters &&
                <Button
                    className={classes.saveChangesButton}
                    variant='contained'
                    onClick={() => { handleSaveChanges() }}>
                    Save changes
                </Button>
            }
        </div>
    );
}

export default CounterGroup;