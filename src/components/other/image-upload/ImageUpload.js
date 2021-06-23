import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useLocation } from 'react-router-dom';

import './imageUpload.styles.scss';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'Column',
        width: '90',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
    button: {
        background: '#e01f3d',
        color: 'white',
        fontSize: '1.4rem',
        width: '30%',
        padding: '5px 40px',
        '&:hover': {
            background: '#e01f3d',
            color: 'white',
            opacity: '0.7',
        },
    },
}));

const ImageUpload = ({ photo, setPhoto }) => {
    const classes = useStyles();
    const imageSizeLimit = 2500000;
    const { pathname } = useLocation();

    const handleChange = (e) => {
        if (e.target.files[0]) {
            if (e.target.files[0].size > imageSizeLimit) {
                alert('File size is too large');
            } else {
                let file = e.target.files[0];
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    setPhoto(reader.result);
                };
            }
        }
    };

    return (
        <div className="imageUploadContainer">
            {pathname === '/register' && (
                <label style={{ textAlign: 'left' }}>
                    Upload a profile image
                </label>
            )}
            {pathname === '/addpost' && (
                <label style={{ textAlign: 'left' }}>
                    Upload an image for your post
                </label>
            )}

            {pathname === '/profile_form' && (
                <label style={{ textAlign: 'left' }}>
                    Update your profile image
                </label>
            )}
            <div className={classes.root}>
                <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={handleChange}
                />
                <label htmlFor="contained-button-file">
                    <Button
                        variant="contained"
                        className={classes.button}
                        component="span"
                    >
                        Upload
                    </Button>
                </label>
                <input
                    accept="image/*"
                    className={classes.input}
                    id="icon-button-file"
                    type="file"
                />
                <div
                    style={{
                        display: 'flex',
                        justifyContent: ' center',
                        alignItems: 'center',
                    }}
                >
                    {photo && (
                        <img
                            onClick={() => setPhoto(null)}
                            src={photo}
                            alt="Event Img Upload"
                            className="imgPreview"
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ImageUpload;
