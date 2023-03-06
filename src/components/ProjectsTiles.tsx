import events from "events";
import { Suspense } from "react";
import { Await, defer, json, useLoaderData } from "react-router-dom";
import MiniaturesList from "./MiniaturesList";


function ProjectTiles () {

    const { projects }: any = useLoaderData();

    return (
        <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={projects}>
          {(loadedProjects) => <MiniaturesList data={loadedProjects} />}
        </Await>
      </Suspense>
    );
}


export default ProjectTiles;


  async function loadProjects() {
    const response = await fetch('https://fiber-frined-default-rtdb.europe-west1.firebasedatabase.app/projects');
  
    if (!response.ok) {
      // return { isError: true, message: 'Could not fetch events.' };
      // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
      //   status: 500,
      // });
      throw json(
        { message: 'Could not fetch events.' },
        {
          status: 500,
        }
      );
    } else {
      const resData = await response.json();
      return resData.events;
    }
  }
  
  export function loader() {
    return defer({
      projects: loadProjects(),
    });
  }