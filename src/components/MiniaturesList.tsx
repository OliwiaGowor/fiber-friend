import { Link } from "react-router-dom";


function MiniaturesList ({data}: any) {

    console.log(data);
    return (
        <div className={""}>
          <h1>All Projects</h1>
          <ul className={""}>
            {data.projects.map((element: any) => (
              <li key={element.id} className={""}>
                <Link to={`/projects/${element.id}`}>
                <h2>{element.name}</h2>
                  <img src={element.image} alt={element} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      );

}


export default MiniaturesList;