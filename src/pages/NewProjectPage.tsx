import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import React, { ReactElement, ReactFragment, ReactNode } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import classes from './NewProjectPage.module.scss';
import IconButton from "@mui/material/IconButton";
import { Category, PhotoCamera } from "@mui/icons-material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ListSubheader from "@mui/material/ListSubheader";
import { categories } from '../components/Categories';
import Button from "@mui/material/Button";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';

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
                console.log(i);
                console.log(selectedImages);
            }
        }
    };

    const handleDeleteImage = (index: number) => {
        if (selectedImages.length > 0) {
            const tmp = selectedImages.filter((image: { id: number; }) =>
                image.id !== index)
            for (let i = 0; i < tmp.length; i++) {
                tmp[i].id = i
            }
            setSelectedImages(tmp);
        }
    };
    console.log(selectedImages);
    return (
        <div className={classes.container}>
            <h1 className={classes.header}>Create new project</h1>
            <form className={classes.form}>
                <div className={classes.formContent}>
                    <InputLabel htmlFor="label">Name</InputLabel>
                    <TextField id="name" label="Name" variant="outlined" size="small" />

                    <Stack direction="row" spacing={4}>
                        <ToggleButtonGroup
                            value={type}
                            exclusive
                            onChange={handleType}
                            aria-label="text alignment"
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
                    </Stack>

                    <div className={classes.photos}>


                        <ImageList sx={{ width: 950, height: 550 }} cols={5} rowHeight={300}>
                            <ImageListItem>
                                <Button variant="outlined" component="label">
                                    <h2>Add photo</h2>
                                    <AddCircleIcon className={classes.addIcon} sx={{ fontSize: 100 }} />
                                    <input hidden accept="image/*" multiple type="file" onChange={handleAddingPhotos} />
                                    < PhotoCamera />
                                </Button>
                            </ImageListItem>
                            {selectedImages && selectedImages.map((image: any, index: number) => (
                                <ImageListItem key={index}>
                                    <img
                                        src={`${image.url}`}
                                        srcSet={`${image.url}`}
                                        alt="not found"
                                        loading="lazy"
                                    />
                                    <Button variant='outlined' onClick={() => { handleDeleteImage(index) }}><DeleteIcon>Remove</DeleteIcon></Button>
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </div>


                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel htmlFor="grouped-select">Grouping</InputLabel>
                        <Select defaultValue="" id="grouped-select" label="Grouping">
                            {Object.values(categories).map(category =>
                                category.subCateg.map(element => {
                                    if (element.category) {
                                        return (
                                            <ListSubheader >
                                                {element.category}
                                            </ListSubheader>
                                        );
                                    } else {
                                        return (
                                            <MenuItem
                                                key={element.name + (Math.random() * 100).toString()}
                                                value={element.name}
                                            >
                                                {element.name}
                                            </MenuItem>
                                        );
                                    }
                                })
                            )}
                        </Select>
                    </FormControl>

                    <Autocomplete
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

                    <div className={classes.yarnsContainer}>
                        {yarns.map((yarn: any, index: any) => (
                            <div key={index} className={classes.yarnDetails}>
                                <div>{yarn}</div>
                                <InputLabel htmlFor="label">{displayTool() + " size"}</InputLabel>
                                <TextField id="name" label="Name" variant="outlined" size="small" />
                                <InputLabel htmlFor="label">Gauge</InputLabel>
                                <TextField id="name" label="Name" variant="outlined" size="small" />
                                <InputLabel htmlFor="label">Stitch</InputLabel>
                                <TextField id="name" label="Name" variant="outlined" size="small" />
                                <InputLabel htmlFor="label">Amount</InputLabel>
                                <TextField id="name" label="Name" variant="outlined" size="small" />
                            </div>
                        ))}
                    </div>

                    <TextField
                        id="notes"
                        label="Multiline"
                        multiline
                        rows={20}
                        sx={{ width: '100%' }}
                    />
                </div>
                <button type="submit"></button>
            </form>
        </div>
    );
}


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