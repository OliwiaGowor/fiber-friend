import Button from "@mui/material/Button";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import React from "react";
import classes from './FileInput.module.scss';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import Collapse from "@mui/material/Collapse";

//TO DO: add responsivenss
//TO DO: fix defaultValue

type Props = {
  onlyImg?: boolean;
  addHeader: string;
  maxFiles: number;
  defaultValue?: any;
}

export const FileInput = <PROPS extends Props,>({ onlyImg, addHeader, maxFiles, defaultValue, ...rest }: PROPS): JSX.Element => {
  const [selectedFiles, setSelectedFiles] = React.useState<any>(defaultValue ? [...defaultValue] : []);
  const [open, setOpen] = React.useState(false);

  console.log(defaultValue);
  console.log(selectedFiles);
  const handleAddingFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      if (event.target.files.length > 10) {
        setOpen(true);
      }
      for (let i = 0; i < maxFiles; i++) {
        setSelectedFiles((files: any) => [...files, { id: files.length, name: event.target.files![i].name, url: URL.createObjectURL(event.target.files![i]), }]);
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

  const displayDifferentFiles = (file: any) => {
    if (file.name.split('.').pop() == 'doc' || file.name.split('.').pop() == 'docx') {
      return (
        <div className={`${classes.photo} ${classes.photoNoPreview}`}>
          <p>{file.name}</p>
          <p>Preview unavailable</p>
        </div>
      );
    } else if (file.name.split('.').pop() == 'pdf') {
      return (
        <object
          data={file.url}
          width="200px"
          height="250px"
          className={classes.photo}
        >
        </object>
      );
    }
    else {
      return (
        <img
          className={classes.photo}
          src={`${file.url}`}
          srcSet={`${file.url}`}
          alt="not found"
          loading="lazy"
          width="200px"
          height="250px"
        />
      );
    }
  }

  return (
    <div className={classes.photosContainer}>
      <ImageList sx={{ width: 950, height: "auto", overflow: "visible" }} cols={5} rowHeight={250} gap={8} className={classes.photos}>
        <ImageListItem className={classes.addPhoto}>
          <Button variant="outlined" component="label" className={classes.btnAddPhoto}>
            <h2 className={classes.btnAddPhotoText}>{addHeader}</h2>
            <AddCircleIcon className={classes.addIcon} sx={{ fontSize: 70 }} />
            <input hidden accept={onlyImg ? "image/*" : 'image/*,application/pdf,.doc,.docx,.txt'} multiple type="file" onChange={handleAddingFile} />
          </Button>
        </ImageListItem>
        {selectedFiles && selectedFiles.map((file: any, index: number) => (
          <ImageListItem key={index} className={classes.addedPhoto}>
            <button className={classes.btnDeletePhoto} onClick={(e) => { handleDeleteFile(index, e) }}><DeleteIcon>Remove</DeleteIcon></button>
            {onlyImg && <img
              className={classes.photo}
              src={`${file.url}`}
              srcSet={`${file.url}`}
              alt="not found"
              loading="lazy"
              width="200px"
              height="250px"
            />}
            {!onlyImg && displayDifferentFiles(file)}
          </ImageListItem>
        ))}
      </ImageList>
      <Collapse in={open}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {'You can add only up to ' + maxFiles} {onlyImg ? ' photos!' : ' files'}
        </Alert>
      </Collapse>
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