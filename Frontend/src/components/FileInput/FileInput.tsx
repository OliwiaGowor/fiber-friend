import Button from "@mui/material/Button";
import React from "react";
import classes from './FileInput.module.scss';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import Collapse from "@mui/material/Collapse";
//TODO: smaller miniatures, for mobile add scroll - only one row
//TODO: add info that the first photo would be main one

interface FileInputProps {
  onlyImg: boolean;
  addHeader: string;
  maxFiles: number;
  defaultValue?: any;
  selectedFiles: any;
}

export const FileInput = ({ onlyImg, addHeader, maxFiles, defaultValue, selectedFiles }: FileInputProps) => {
  const [addedFiles, setAddedFiles] = React.useState<any>(defaultValue ?? []);
  const [open, setOpen] = React.useState(false);

  function fileToBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target) {
          const base64String = event.target.result as string;
          resolve(base64String.split(',')[1]); // Extract base64 data from the result
        } else {
          reject(new Error('Error reading file'));
        }
      };

      reader.readAsDataURL(file);
    });
  }

  const handleAddingFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      if (event.target.files.length > 10) {
        setOpen(true);
      }
      for (let i = 0; i < event.target.files.length && i < maxFiles; i++) {
        const base64Content = await fileToBase64(event.target.files![i]);

        setAddedFiles((files: any) => [...files, {
          id: files.length,
          name: event.target.files![i].name,
          content: base64Content,
          type: event.target.files![i].type,
          url: URL.createObjectURL(event.target.files![i]),
        }]);

        selectedFiles((files: any) => [...files, {
          id: files.length,
          name: event.target.files![i].name,
          content: base64Content,
          type: event.target.files![i].type,
          url: URL.createObjectURL(event.target.files![i]),
        }]);
      }
    }
  };
  console.log(defaultValue)
  const handleDeleteFile = (index: number, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (addedFiles.length > 0) {
      const tmp = addedFiles.filter((file: { id: number; }) =>
        file?.id !== index)
      for (let i = 0; i < tmp.length; i++) {
        tmp[i].id = i

      }
      setAddedFiles(tmp);
      selectedFiles(tmp);
    }
  };

  const displayDifferentFiles = (file: any) => {
    if (file?.name.slice(-3) == 'doc' || file?.name.slice(-4) == 'docx') {
      return (
        <div className={`${classes.photo} ${classes.photoNoPreview}`}>
          <p>{file?.name}</p>
          <p>Preview unavailable</p>
        </div>
      );
    } else if (file?.name.slice(-3) == 'pdf') {
      return (
        <object
          data={file?.url}
          width="150px"
          height="175px"
          className={classes.photo}
        >
        </object>
      );
    }
    else {
      return (
        <img
          className={classes.photo}
          src={`${file?.url}`}
          srcSet={`${file?.url}`}
          alt="not found"
          loading="lazy"
          width="150px"
          height="175px"
        />
      );
    }
  }

  return (
    <div className={classes.photosContainer}>
      <div className={classes.photos}>
        <div className={classes.addPhoto}>
          <Button
            variant="outlined"
            component="label"
            className={classes.btnAddPhoto}
          >
            <h2 className={classes.btnAddPhotoText}>{addHeader}</h2>
            <AddCircleIcon className={classes.addIcon} sx={{ fontSize: 60 }} />
            <input
              hidden
              accept={onlyImg ? "image/*" : 'image/*,application/pdf,.doc,.docx,.txt'}
              multiple
              type="file"
              onChange={handleAddingFile}
            />
          </Button>
        </div>
        {addedFiles && addedFiles?.map((file: any, index: number) => (
          <>
            {file.url &&
              <div key={index} className={classes.addedPhoto}>
                <button
                  className={classes.btnDeletePhoto}
                  onClick={(e) => { handleDeleteFile(index, e) }}
                >
                  <DeleteIcon>
                    Remove
                  </DeleteIcon>
                </button>
                {onlyImg &&
                  <img
                    className={classes.photo}
                    src={`${file?.url}`}
                    srcSet={`${file?.url}`}
                    alt="not found"
                    loading="lazy"
                    width="150px"
                    height="175px"
                  />}
                {!onlyImg && displayDifferentFiles(file)}
              </div>
            }
          </>
        ))}
      </div>
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