import { useRouteLoaderData } from "react-router-dom";
import ResourceForm from "../../components/Forms/ResourceForm/ResourceForm";

export default function EditResource() {
    const { resource } = useRouteLoaderData('resource-details') as { resource: any };

    return (
        <ResourceForm resource={resource} method="PUT"/>
    );
    
}


