import Button from "@mui/material/Button";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import React from "react";
import classes from './FileInput.module.scss';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
  onlyImg?: boolean
}

export const FileInput = <PROPS extends Props,>({ onlyImg, ...rest }: PROPS): JSX.Element => {
  const [selectedFiles, setSelectedFiles] = React.useState<any>([]);
  let ifImg: boolean = true;
  const handleAddingFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      for (let i = 0; i < event.target.files.length; i++) {
        setSelectedFiles((files: any) => [...files, { id: files.length, url: URL.createObjectURL(event.target.files![i]), }]);
      }
    }
  };

  const handleDeleteFile = (index: number, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (selectedFiles.length > 0) {
      const tmp = selectedFiles.filter((file: { id: number; }) =>
        file.id !== index)
      for (let i = 0; i < tmp.length; i++) {
        tmp[i].id = i
      }
      setSelectedFiles(tmp);
    }
  };

  return (
    <div className={classes.photosContainer}>
      <ImageList sx={{ width: 950, height: "auto", overflow: "visible" }} cols={5} rowHeight={250} gap={8} className={classes.photos}>
        <ImageListItem className={classes.addPhoto}>
          <Button variant="outlined" component="label" className={classes.btnAddPhoto}>
            <h2 className={classes.btnAddPhotoText}>Add photo</h2>
            <AddCircleIcon className={classes.addIcon} sx={{ fontSize: 70 }} />
            <input hidden accept={onlyImg ? "image/*" : ''} multiple type="file" onChange={handleAddingFile} />
          </Button>
        </ImageListItem>
        {selectedFiles && selectedFiles.map((image: any, index: number) => (
          <ImageListItem key={index} className={classes.addedPhoto}>
            <button className={classes.btnDeletePhoto} onClick={(e) => { handleDeleteFile(index, e) }}><DeleteIcon>Remove</DeleteIcon></button>
            {ifImg && <img
              className={classes.photo}
              src={`${image.url}`}
              srcSet={`${image.url}`}
              alt="not found"
              loading="lazy"
              width="190px"
              height="250px"
            />}
            {!ifImg && <object data={image.url} ></object>}
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
};



/*// drag state
  const [dragActive, setDragActive] = React.useState(false);
  // ref
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  
  // handle drag events
  const handleDrag = function(e: any) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  // triggers when file is dropped
  const handleDrop = function(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // handleFiles(e.dataTransfer.files);
    }
  };
  
  // triggers when file is selected with click
  const handleChange = function(e: any) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      // handleFiles(e.target.files);
    }
  };
  
// triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef.current?.click();
  };
  
  return (
    <div className={classes.fileUpload} id="file-upload" onDragEnter={handleDrag} >
      <input className={classes.fileUploadInput} ref={inputRef} type="file" id="input-file-upload" multiple={true} onChange={handleChange} />
      <label id="label-file-upload" htmlFor="input-file-upload" className={`${dragActive ? "dragActive" : ""} `}>
        <div>
          <p>Drag and drop your file here or</p>
          <button className={classes.btnUpload} onClick={onButtonClick}>Upload a file</button>
        </div> 
      </label>
      { dragActive && <div className={classes.dragFileElem} id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
    </div>
  );*/