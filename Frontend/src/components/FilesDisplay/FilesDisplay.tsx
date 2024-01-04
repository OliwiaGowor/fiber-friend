import { useState } from 'react';
import classes from './FilesDisplay.module.scss';
import { Modal } from '@mui/material';
import FullScreenDisplay from '../FullScreenDisplay/FullScreenDisplay';
import CloseIcon from '@mui/icons-material/Close';

interface FilesDisplayProps {
    files: any;
}

export const FilesDisplay = ({ files }: FilesDisplayProps) => {
    const [open, setOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<any>(null);

    const handleClose = () => {
        setOpen(false);
        setSelectedFile(null);
    };

    function downloadFileFromBase64(base64String: string, fileName: string, fileType: string) {
        const byteCharacters = atob(base64String);
        const byteNumbers = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: fileType });

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const displayDifferentFiles = (file: any) => {
        if (file.name.slice(-3) == 'doc' || file.name.slice(-4) == 'docx') {
            return (
                <div
                    className={`${classes.photo} ${classes.photoNoPreview}`}
                    onClick={() => downloadFileFromBase64(file.content, file.name, 'docx')}
                >
                    <p>{file.name}</p>
                    <p>Preview unavailable</p>
                </div>
            );
        } else if (file.name.slice(-3) == 'pdf') {
            return (
                <object
                    data={`data:${file.type};base64,${file.content}`}
                    width="200px"
                    height="250px"
                    className={classes.photo}
                    onClick={() => downloadFileFromBase64(file.content, file.name, 'pdf')}
                >
                </object>
            );
        }
        else {
            return (
                <img
                    className={classes.photo}
                    src={`data:${file.type};base64,${file.content}`}
                    srcSet={`data:${file.type};base64,${file.content}`}
                    alt={`File: ${file.name}`}
                    loading="lazy"
                    width="200px"
                    height="250px"
                />
            );
        }
    }
    console.log(selectedFile)
    return (
        <div className={classes.photosContainer}>
            <div className={classes.photos}>
                {files && files.map((file: any, index: number) => (
                    <div key={index} className={classes.addedPhoto} onClick={() => setSelectedFile(file)}>
                        {displayDifferentFiles(file)}
                    </div>
                ))}
            </div>
            {!files && <div className={classes.noFiles}>
                <h2 className={classes.noFilesText}>NO FILES</h2>
            </div>
            }
            {selectedFile && (
                <button className={classes.closeIcon} onClick={handleClose}>
                    <CloseIcon sx={{ fontSize: '2rem' }} />
                </button>
            )}
            {selectedFile && (
                <Modal
                    open={true}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    className={classes.modal}
                >
                    <FullScreenDisplay file={selectedFile} />

                </Modal>
            )}
        </div>
    );
};
