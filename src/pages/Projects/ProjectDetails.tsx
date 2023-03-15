import { CircularProgress } from "@mui/material";
import { Suspense } from "react";
import { useLoaderData, Await, json, defer, useRouteLoaderData } from "react-router-dom";
import classes from './ProjectDetails.module.scss';
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

export default function ProjectDetails() {
    const { project } = useRouteLoaderData('project-details') as { project: any };
    console.log(project.photos);
    const pagination = {
        clickable: true,
        renderBullet: function (index: number, className: string) {
            return '<span class="' + className + '">' + (index + 1) + "</span>";
        },
    };

    return (
        <div>
            <div className={classes.container}>

                <Suspense fallback={<p style={{ textAlign: 'center' }}><CircularProgress /></p>}>
                    <Await resolve={project}>
                        <div className={classes.details}>
                            <div className={classes.leftElements}><h1 className={classes.header}>PROJECT</h1>
                                <div className={classes.sectionContainer}>
                                    <div className={classes.name}>
                                        {project.name}
                                        <div className={classes.type}>
                                            {project.type}
                                        </div>

                                        <div className={classes.category}>
                                            {project.category}
                                        </div>
                                    </div>


                                    <div className={`${classes.sectionContainer} ${classes.formInput}`}>
                                        <label>Yarns</label>

                                        {project.yarns && project.yarns.map((yarn: any, index: any) => (
                                            <div key={index} className={classes.yarnDetails}>
                                                <div>{yarn}</div>
                                                <label htmlFor="label"></label>

                                                <label htmlFor="label">Gauge</label>

                                                <label htmlFor="label">Stitch</label>

                                                <label htmlFor="label">Amount</label>

                                            </div>
                                        ))}

                                    </div>
                                    <div className={classes.sectionContainer}>
                                        <label>Notes</label>

                                    </div>
                                </div>
                            </div>
                            <div className={classes.rightElements}>
                                <div className={classes.sectionContainer}>
                                    <div className={classes.photosContainer}>
                                        <label>Photos</label>
                                        <Swiper
                                            pagination={pagination}
                                            modules={[Pagination]}
                                            className={classes.photos}
                                        >
                                            {project.photos && project.photos.map((photo: any, index: number) => (
                                                <SwiperSlide key={index} className={classes.addedPhoto}>
                                                    <img
                                                        className={classes.photo}
                                                        src={`${photo}`}
                                                        srcSet={`${photo}`}
                                                        alt="not found"
                                                        loading="lazy"
                                                        width="190px"
                                                        height="250px"
                                                    />
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Await>
                </Suspense>
            </div>
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

        return resData;
    }
}


export async function loader({ request, params }: any) {
    const id = params.projectId;
    return defer({
        project: await loadProjectDetails(id),
    });
}