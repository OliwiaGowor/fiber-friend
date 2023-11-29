import { useRouteLoaderData } from "react-router"
import ProjectForm from "../../components/ProjectForm/ProjectForm";

export default function EditProject() {
    const { project } = useRouteLoaderData("project-details") as { project: any };
    
    return (
        <ProjectForm project={project} method="PUT" />
    );
}
