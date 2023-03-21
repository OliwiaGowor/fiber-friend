import TextField from "@mui/material/TextField";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import React, { useRef } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import classes from './ProjectForm.module.scss';
import Button from "@mui/material/Button";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import OutlinedInput from "@mui/material/OutlinedInput";
import CategoriesMenu from "./CategoriesMenu";
import { Form, json, redirect, useNavigate } from "react-router-dom";
import { FileUpload } from "@mui/icons-material";
import { FileInput } from "./PhotoInput";
import BasicTabsForm from "./TabsPanelForm";

const sizes = [
    { size: "XXS" },
    { size: "XS" },
    { size: "S" },
    { size: "M" },
    { size: "L" },
    { size: "XL" },
    { size: "XXL" },
    { size: "XXXL" },
    { size: "4XL" },
]

export default function ProjectForm() {
    const navigate = useNavigate();
    const [type, setType] = React.useState('crochet');
    const [yarnsInfo, setYarnsInfo] = React.useState<any>([]);
    const nameRef = React.useRef<HTMLInputElement | null>(null);
    const [category, setCategory] = React.useState<any>();
    const toolRef = React.useRef<HTMLInputElement | null>(null);

    const handleCategory = (categ: string) => {
        setCategory(categ);
    }

    const handleType = (event: React.MouseEvent<HTMLElement>, newType: string | null,) => {
        if (newType !== null) {
            setType(newType);
        }
    };

    const displayTool = () => {
        if (type == 'crochet') {
            return "Hook";
        } else if (type == 'knitting') {
            return 'Needle';
        } else {
            return 'Tool';
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const method = 'post';

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
        return navigate('/projects');
    }

    const getYarnsInfo = (yarnsInfo: any) => {
        setYarnsInfo(yarnsInfo);
    }

    return (
        <div className={classes.container}>
            <h1 className={classes.header}>Create new project</h1>
            <form onSubmit={handleSubmit} className={classes.form} >
                <div className={classes.formContent}>
                    <div className={classes.sectionContainer}>
                        <div className={classes.nameInputContainer}>
                            <label htmlFor="name">Project name</label>
                            <OutlinedInput
                                id="name"
                                aria-describedby="name-helper-text"
                                inputProps={{
                                    'aria-label': 'name',
                                }}
                                placeholder="Write project name"
                                size="small"
                                className={classes.formInput}
                                name='name'
                                inputRef={nameRef}
                            />
                        </div>
                        <div className={classes.typeToggle}>
                            <label htmlFor="types">Type</label>
                            <ToggleButtonGroup
                                value={type}
                                exclusive
                                onChange={handleType}
                                aria-label="text alignment"
                                id="types"
                                className={classes.formInput}
                            >
                                <ToggleButton value="crochet" aria-label="crochet" disableRipple>
                                    Crochet
                                </ToggleButton>
                                <ToggleButton value="knitting" aria-label="knitting" disableRipple>
                                    Knitting
                                </ToggleButton>
                                <ToggleButton value="other" aria-label="otherd" disableRipple>
                                    Other
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </div>

                        <div className={classes.categoriesContainer}>
                            <label htmlFor="categories">Category</label>
                            <CategoriesMenu chooseCategory={handleCategory} />
                        </div>
                    </div>
                    <div className={classes.sectionContainer}>
                        <FileInput />
                    </div>

                    <div className={`${classes.sectionContainer} ${classes.formInput}`}>
                        <BasicTabsForm getInfo={getYarnsInfo} />
                    </div>
                    <div className={classes.sectionContainer}>
                        <label>Pattern</label>

                        <label>Notes</label>
                        <TextField
                            className={`${classes.notesField} ${classes.formInput}`}
                            id="notes"
                            multiline
                            rows={20}
                            sx={{ width: '100%' }}
                        />
                    </div>
                </div>
                <button type="submit"></button>
            </form>
        </div>
    );
}
