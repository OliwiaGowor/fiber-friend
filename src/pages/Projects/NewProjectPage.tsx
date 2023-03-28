import ProjectForm from "../../components/ProjectForm";
import classes from './NewProjectPage.module.scss';

export default function NewProjectPage() {

    return (
        <div className={classes.container}>
            <ProjectForm />
        </div>
    ); 
}


