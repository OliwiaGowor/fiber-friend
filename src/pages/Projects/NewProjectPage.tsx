import TextField from "@mui/material/TextField";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import React, {  } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import classes from './NewProjectPage.module.scss';
import Button from "@mui/material/Button";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import OutlinedInput from "@mui/material/OutlinedInput";
import CategoriesMenu from "../../components/CategoriesMenu";
import { Form, json, redirect } from "react-router-dom";

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

const availableYarns = [
    { name: 'yarn' },
]

export default function NewProjectPage() {

    const [type, setType] = React.useState('crochet');
    const [yarns, setYarns] = React.useState<any>([]);
    const [selectedImages, setSelectedImages] = React.useState<any>([]);

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

    const handleAddingPhotos = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            for (let i = 0; i < event.target.files.length; i++) {
                setSelectedImages((images: any) => [...images, { id: images.length, url: URL.createObjectURL(event.target.files![i]), }]);
            }
        }
    };

    const handleDeleteImage = (index: number, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (selectedImages.length > 0) {
            const tmp = selectedImages.filter((image: { id: number; }) =>
                image.id !== index)
            for (let i = 0; i < tmp.length; i++) {
                tmp[i].id = i
            }
            setSelectedImages(tmp);
        }
    };

    return (
        <div className={classes.container}>
            <h1 className={classes.header}>Create new project</h1>
            <Form className={classes.form} method='post'>
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
                            <CategoriesMenu />
                        </div>
                    </div>
                    <div className={classes.sectionContainer}>
                        <div className={classes.photosContainer}>
                            <label>Photos</label>
                            <ImageList sx={{ width: 950, height: "auto", overflow: "visible" }} cols={5} rowHeight={250} gap={8} className={classes.photos}>
                                <ImageListItem className={classes.addPhoto}>
                                    <Button variant="outlined" component="label" className={classes.btnAddPhoto}>
                                        <h2 className={classes.btnAddPhotoText}>Add photo</h2>
                                        <AddCircleIcon className={classes.addIcon} sx={{ fontSize: 70 }} />
                                        <input hidden accept="image/*" multiple type="file" onChange={handleAddingPhotos} />

                                    </Button>
                                </ImageListItem>
                                {selectedImages && selectedImages.map((image: any, index: number) => (
                                    <ImageListItem key={index} className={classes.addedPhoto}>
                                        <button className={classes.btnDeletePhoto} onClick={(e) => { handleDeleteImage(index, e) }}><DeleteIcon>Remove</DeleteIcon></button>
                                        <img
                                            className={classes.photo}
                                            src={`${image.url}`}
                                            srcSet={`${image.url}`}
                                            alt="not found"
                                            loading="lazy"
                                            width="190px"
                                            height="250px"
                                        />
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        </div>
                    </div>

                    <div className={`${classes.sectionContainer} ${classes.formInput}`}>
                        <label>Yarns</label>
                        <p className={classes.additionalText}>Add yarns</p>
                        <Autocomplete
                            className={classes.yarnsInput}
                            multiple
                            id="yarns"
                            options={availableYarns.map((option) => option.name)}
                            freeSolo
                            renderTags={(value: readonly string[], getTagProps) =>
                                value.map((option: string, index: number) => (
                                    <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                ))
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="filled"
                                    label="Yarns"
                                    placeholder="Yarn"
                                />
                            )}
                            onChange={(event, newValue) => {
                                setYarns(newValue);
                            }}
                        />


                        {yarns.map((yarn: any, index: any) => (
                            <div key={index} className={classes.yarnDetails}>
                                <div>{yarn}</div>
                                <label htmlFor="label">{displayTool() + " size"}</label>
                                <TextField id="name" label="Name" variant="outlined" size="small" />
                                <label htmlFor="label">Gauge</label>
                                <TextField id="name" label="Name" variant="outlined" size="small" />
                                <label htmlFor="label">Stitch</label>
                                <TextField id="name" label="Name" variant="outlined" size="small" />
                                <label htmlFor="label">Amount</label>
                                <TextField id="name" label="Name" variant="outlined" size="small" />
                            </div>
                        ))}

                    </div>
                    <div className={classes.sectionContainer}>
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
            </Form>
        </div>
    );
}

export async function action({ request, params }: any) {
    const method = request.method;
    const data = await request.formData();
  
    const projectData = {
      title: data.get('title'),
      image: data.get('image'),
      date: data.get('date'),
      description: data.get('description'),
    };
  
    let url = 'http://localhost:8080/projects';
  
    if (method === 'PATCH') {
      const projectId = params.projectId;
      url = 'http://localhost:8080/events/' + projectId;
    }
  
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
  
    return redirect('/projects');
  }
