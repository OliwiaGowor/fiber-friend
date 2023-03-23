import { CircularProgress } from "@mui/material";
import { Suspense } from "react";
import { Await, json, defer, useRouteLoaderData } from "react-router-dom";
import classes from './ProjectDetails.module.scss';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import TabsPanelDisplay from "../../components/TabsPanelDisplay";

export default function ProjectDetails() {
    const { project } = useRouteLoaderData('project-details') as { project: any };
    const pagination = {
        clickable: true,
        renderBullet: function (index: number, className: string) {
            return '<span class="' + className + '">' + "</span>";
        },
    };

    return (
        <div className={classes.container}>
            <Suspense fallback={<p style={{ textAlign: 'center' }}><CircularProgress /></p>}>
                <Await resolve={project}>
                    <div className={classes.details}>
                        <div className={classes.dividedContainer}>
                            <div className={classes.leftElements}>
                                <div className={classes.sectionContainer}>
                                    <h1 className={classes.header}>
                                        {project.name}
                                    </h1>
                                    <h2 className={classes.sectionHeader}>Details</h2>
                                    <div className={classes.projectInfoContainer}>
                                        <div className={classes.attributeName}>Type: </div>
                                        {project.type ? project.type : <br></br>}

                                        <div className={classes.attributeName}>Category: </div>
                                        {project.category ? project.category : <br></br>}

                                        <div className={classes.attributeName}>Start date: </div>
                                        {project.startDate ? project.startDate : <br></br>}

                                        <div className={classes.attributeName}>End date: </div>
                                        {project.endDate ? project.endDate : <br></br>}
                                    </div>
                                </div>
                                <div className={`${classes.sectionContainer} ${classes.formInput}`}>
                                    <h2 className={classes.sectionHeader}>Yarns</h2>
                                    <TabsPanelDisplay yarns={project.yarns} />
                                </div>

                            </div>
                            <div className={classes.rightElements}>
                                <div className={classes.sectionContainer}>
                                    <div className={classes.photosContainer}>
                                        <h2 className={classes.sectionHeader}>Photos</h2>
                                        <Swiper
                                            pagination={pagination}
                                            modules={[Pagination, Navigation]}
                                            className={classes.photos}
                                            navigation={true}
                                            rewind={true}
                                        >
                                            {project.photos && project.photos.map((photo: any, index: number) => (
                                                <SwiperSlide key={index} className={classes.addedPhoto}>
                                                    <img
                                                        className={classes.photo}
                                                        src={`${photo}`}
                                                        srcSet={`${photo}`}
                                                        alt="not found"
                                                        loading="lazy"
                                                        width="449px"
                                                        height="449px"
                                                    />
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={classes.wholeScreenElements}>
                            <div className={classes.sectionContainer}>
                                <h2 className={classes.sectionHeader}>Patterns and notes</h2>
                                <div className={classes.attributeName}>Patterns</div>
                                <div className={classes.attributeName}>Notes</div>
                                <div className={classes.notes}>{project.notes}</div>
                            </div>
                        </div>
                    </div>
                </Await>
            </Suspense>
        </div>
    );
}

async function loadProjectDetails(id: string) {
    const response = await fetch('https://fiber-frined-default-rtdb.europe-west1.firebasedatabase.app/projects/' + id + '.json');

    if (!response.ok) {
        // return { isError: true, message: 'Could not fetch project.' };
        // throw new Response(JSON.stringify({ message: 'Could not fetch project.' }), {
        //   status: 500,
        // });
        throw json(
            { message: 'Could not fetch project.' },
            {
                status: 500,
            }
        );
    } else {
        const resData = await response.json();
        const yarnsObj = resData.yarns;
        const yarnsArray: any = [];

        Object.keys(yarnsObj).forEach((key) => {
            yarnsArray.push({ yarn: [key], info: yarnsObj[key] });
        });
        resData.yarns = yarnsArray;
        return resData;
    }
}

export async function loader({ request, params }: any) {
    const id = params.projectId;
    return defer({
        project: await loadProjectDetails(id),
    });
}