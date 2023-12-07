import classes from './FilesDisplay.module.scss';

interface FilesDisplayProps {
    files: any;
}

export const FilesDisplay = ({files}: FilesDisplayProps) => {

    const displayDifferentFiles = (file: any) => {
        if (file.name.slice(-3) == 'doc' || file.name.slice(-4) == 'docx') {
            return (
                <div className={`${classes.photo} ${classes.photoNoPreview}`}>
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

    return (
        <div className={classes.photosContainer}>
            <div className={classes.photos}>
                {files && files.map((file: any, index: number) => (
                    <div key={index} className={classes.addedPhoto}>
                        {displayDifferentFiles(file)}
                    </div>
                ))}
            </div>
            {!files && <div className={classes.noFiles}>
                <h2 className={classes.noFilesText}>NO FILES</h2>
            </div>
            }
        </div>
    );
};
