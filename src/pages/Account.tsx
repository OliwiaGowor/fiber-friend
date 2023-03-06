import { Suspense } from "react";
import { Await, defer, json, useLoaderData } from "react-router-dom";
import MiniaturesList from "../components/MiniaturesList";
import SidebarAccount from "../components/SidebarAccount";


function Account () {
    const { projects, patterns, orders }: any = useLoaderData();
    console.log(projects);
    return (
        <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={projects}>
          {(loadedProjects) => <MiniaturesList data={loadedProjects} />}
        </Await>
      </Suspense>
      
    );
}


export default Account;


  async function loadProjects() {
    const response = await fetch('https://fiber-frined-default-rtdb.europe-west1.firebasedatabase.app/projects.json');
  
    if (!response.ok) {
      // return { isError: true, message: 'Could not fetch events.' };
      // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
      //   status: 500,
      // });
      throw json(
        { message: 'Could not fetch projects.' },
        {
          status: 500,
        }
      );
    } else {
      const resData = await response.json();

      return resData;
    }
  }

  async function loadPatterns() {
    const response = await fetch('https://fiber-frined-default-rtdb.europe-west1.firebasedatabase.app/projects.json');
  
    if (!response.ok) {
      // return { isError: true, message: 'Could not fetch events.' };
      // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
      //   status: 500,
      // });
      throw json(
        { message: 'Could not fetch projects.' },
        {
          status: 500,
        }
      );
    } else {
      const resData = await response.json();
      return resData;
    }
  }

  async function loadOrders() {
    const response = await fetch('https://fiber-frined-default-rtdb.europe-west1.firebasedatabase.app/projects.json');
  
    if (!response.ok) {
      // return { isError: true, message: 'Could not fetch events.' };
      // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
      //   status: 500,
      // });
      throw json(
        { message: 'Could not fetch projects.' },
        {
          status: 500,
        }
      );
    } else {
      const resData = await response.json();
      return resData;
    }
  }
  
  export async function loader() {
    const [projects, patterns, orders] = await Promise.all([
        loadProjects(),
        loadPatterns(),
        loadOrders()
     ]);

     return defer({
        projects,
        patterns,
        orders,
      });
  }