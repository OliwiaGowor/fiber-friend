import TextField from "@mui/material/TextField";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import React from "react";
import classes from './PatternForm.module.scss';
import Button from "@mui/material/Button";
import CategoriesMenu from "./CategoriesMenu";
import { json, useNavigate } from "react-router-dom";
import { FileInput } from "./PhotoInput";
import BasicTabsForm from "./TabsPanelForm";

export default function PatternForm() {
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
                        <h2 className={classes.sectionHeader}>Details</h2>
                        <TextField
                            id="name"
                            inputProps={{
                                'aria-label': 'name',
                            }}
                            label="Project name"
                            required
                            className={classes.formInput}
                            name='name'
                            inputRef={nameRef}
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
                            <CategoriesMenu chooseCategory={handleCategory} />
                        </div>
                    </div>

                    <div className={classes.sectionContainer}>
                        <h2 className={classes.sectionHeader}>Photos</h2>
                        <p className={classes.additionalText}>Add up to 10 photos of your work!</p>
                        <FileInput />
                    </div>

                    <div className={`${classes.sectionContainer} ${classes.formInput}`}>
                        <h2 className={classes.sectionHeader}>Yarns and tools</h2>
                        <p className={classes.additionalText}>Add yarns to see more options</p>
                        <BasicTabsForm getInfo={getYarnsInfo} />
                    </div>

                    <div className={classes.sectionContainer}>
                        <h2 className={classes.sectionHeader}>Patterns and notes</h2>
                        <p>Pattern</p>

                        <TextField
                            className={`${classes.notesField} ${classes.formInput}`}
                            id="notes"
                            multiline
                            rows={15}
                            label='Write your notes here'
                            sx={{ width: '100%' }}
                        />
                    </div>
                </div>
                <Button className={classes.submitBtn} variant="contained" type="submit">Add new project</Button>
            </form>
        </div>
    );
}
