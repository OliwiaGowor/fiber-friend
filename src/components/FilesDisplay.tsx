import classes from './FilesDisplay.module.scss';

type Props = {
    files: any;
}

export const FilesDisplay = <PROPS extends Props>({ files, ...rest }: PROPS): JSX.Element => {

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
            <div className={classes.photos}>
                {files && files.map((file: any, index: number) => (
                    <div key={index} className={classes.addedPhoto}>
                        {displayDifferentFiles(file)}
                    </div>
                ))}
            </div>
            {!files && <div className={classes.noFiles}>
                <h2 className={classes.noFilesText}>No patterns</h2>
            </div>
            }
        </div>
    );
};
