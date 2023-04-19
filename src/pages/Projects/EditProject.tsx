import { json, defer, useRouteLoaderData, useNavigate } from "react-router-dom";
import classes from './EditProject.module.scss';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CategoriesMenu from "../../components/CategoriesMenu";
import { FileInput } from "../../components/FileInput";
import BasicTabsForm from "../../components/TabsPanelForm";


export default function EditProject() {
    const { project } = useRouteLoaderData('project-details') as { project: any };
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const photos = project.photos;
    const navigate = useNavigate();
    const [type, setType] = React.useState(project.type);
    const [yarnsInfo, setYarnsInfo] = React.useState<any>([]);
    const nameRef = React.useRef<HTMLInputElement | null>(null);
    const [category, setCategory] = React.useState<string | null>();
    const [showYarnsError, setShowYarnsError] = React.useState<boolean>(false);
    const [showCategoriesError, setShowCategoriesError] = React.useState<boolean>(false);
    const [showNameError, setShowNameError] = React.useState<boolean>(false);
    const [proceedSubmit, setProceedSubmit] = React.useState<boolean>(true);
    const [dateError, setDateError] = React.useState<any>(null);
    const [startDate, setStartDate] = React.useState<any>();
    const [endDate, setEndDate] = React.useState<any>();
    const [requiredError, setRequiredError] = React.useState<any>(false);

    const handleType = (event: React.MouseEvent<HTMLElement>, newType: string | null,) => {
        if (newType !== null) {
            setType(newType);
        }
    };

    let dateErrorMessage = requiredError ? 'Enter start date!' : undefined;

    //Handle form submit - request
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const method = 'post';
        if (proceedSubmit) {
            const projectData = {
                id: Math.floor(Math.random()) * 10000,
                name: nameRef.current?.value,
                type: type,
                category: category,
                //photos: selectedImages,
            };
            let url = 'https://fiber-frined-default-rtdb.europe-west1.firebasedatabase.app/projects.json';

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(projectData),
            });

            if (response.status === 422) {
                return response;
            }

            if (!response.ok) {
                throw json({ message: 'Could not save project.' }, { status: 500 });
            }
            const data = await response.json();
            return navigate('/fiber-friend/account/projects');
        } else {
            return;
        }
    };

    //Form validation
    const validateForm = () => {
        if (yarnsInfo.length <= 0) {
            setShowYarnsError(true);
            setProceedSubmit(false);
        }
        if (!nameRef.current?.value) {
            setShowNameError(true);
            setProceedSubmit(false);
        }
        if (category === undefined) {
            setShowCategoriesError(true);
            setProceedSubmit(false);
        }
        if (startDate === undefined) {
            setRequiredError(true);
            setProceedSubmit(false);
        }
    };

    return (
        <div className={classes.container}>
            <h1 className={classes.header}>Create new project</h1>
            <form onSubmit={handleSubmit} className={classes.form} >
                <div className={classes.formContent}>
                    <div className={classes.sectionContainer}>
                        <h2 className={classes.sectionHeader}>Details</h2>
                        <TextField
                            id="name"
                            inputProps={{
                                'aria-label': 'name',
                            }}
                            label="Project name"
                            className={classes.formInput}
                            name='name'
                            inputRef={nameRef}
                            error={showNameError}
                            helperText={showNameError ? 'Enter project name!' : ''}
                            onChange={() => { setShowNameError(false) }}
                            defaultValue={project.name}
                        />
                        <div className={classes.typeToggle}>
                            <ToggleButtonGroup
                                value={type}
                                exclusive
                                onChange={handleType}
                                aria-label="text alignment"
                                id="types"
                            >
                                <ToggleButton value="crochet" className={classes.toggleButton} aria-label="crochet" disableRipple
                                    sx={{
                                        backgroundColor: "var(--background-color)",
                                        '&.Mui-selected, &.Mui-selected:hover': {
                                            backgroundColor: "var(--main-color-light)",
                                        }
                                    }}>
                                    Crochet
                                </ToggleButton>
                                <ToggleButton value="knitting" className={classes.toggleButton} aria-label="knitting" disableRipple
                                    sx={{
                                        backgroundColor: "var(--background-color)",
                                        '&.Mui-selected, &.Mui-selected:hover': {
                                            backgroundColor: "var(--main-color-light)",
                                        }
                                    }}>
                                    Knitting
                                </ToggleButton>
                                <ToggleButton value="other" className={classes.toggleButton} aria-label="other" disableRipple
                                    sx={{
                                        backgroundColor: "var(--background-color)",
                                        '&.Mui-selected, &.Mui-selected:hover': {
                                            backgroundColor: "var(--main-color-light)",
                                        }
                                    }}>
                                    Other
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                        <div className={classes.categoriesContainer}>
                            <CategoriesMenu 
                            showError={showCategoriesError} 
                            chooseCategory={(categ: string) => { setCategory(categ) }} 
                            defaultValue={project.category} 
                            />
                        </div>
                        <div className={classes.datePickers}>
                            <DatePicker
                                className={classes.dateInput}
                                label="Start date *"
                                onChange={(newValue: any) => { setStartDate(newValue) }}
                                onError={(newError) => {
                                    setDateError(newError);
                                    setRequiredError(false)
                                }}
                                slotProps={{
                                    textField: {
                                        helperText: dateErrorMessage,
                                    },
                                }}
                                defaultValue={project.startDate}
                            />
                            <DatePicker
                                className={classes.dateInput}
                                label="End date"
                                format="DD-MM-YYYY"
                                minDate={startDate}
                                onChange={(newValue: any) => { setEndDate(newValue) }}
                                defaultValue={project.endDate}
                            />

                        </div>
                    </div>

                    <div className={classes.sectionContainer}>
                        <h2 className={classes.sectionHeader}>Photos</h2>
                        <p className={classes.additionalText}>Add up to 10 photos of your work!</p>
                        <div className={classes.photoInput}>
                            <FileInput onlyImg={true} addHeader={'Add photo'} maxFiles={10} defaultValue={photos}/>
                        </div>
                    </div>

                    <div className={`${classes.sectionContainer} ${classes.formInput}`}>
                        <h2 className={classes.sectionHeader}>Yarns and tools</h2>
                        <p className={classes.additionalText}>Add yarns to see more options</p>
                        <BasicTabsForm showError={showYarnsError} getInfo={(yarnsInfo: any) => { setYarnsInfo(yarnsInfo) }} defaultValue={project.yarns}/>
                    </div>

                    <div className={classes.sectionContainer}>
                        <h2 className={classes.sectionHeader}>Patterns and notes</h2>
                        <p className={classes.additionalText}>Add up to 5 files with patterns!</p>
                        <div className={classes.photoInput}>
                            <FileInput onlyImg={false} addHeader={'Add patterns'} maxFiles={5} defaultValue={project.patterns}/>
                        </div>
                        <TextField
                            className={`${classes.notesField} ${classes.formInput}`}
                            id="notes"
                            multiline
                            rows={15}
                            label='Write your notes here'
                            sx={{ width: '100%' }}
                            defaultValue={project.notes}
                        />
                    </div>
                </div>
                <Button className={classes.submitBtn} variant="contained" type="submit" onClick={validateForm}>Add new project</Button>
            </form>
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