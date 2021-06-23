import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

import { axiosWithAuth } from '../../utils/axiosWithAuth.js';
import { scrollToTop } from '../../utils/functions';
import { postContext } from '../../contexts/postContext.js';
import ProtectedHeader from '../other/protected-header/ProtectedHeader.js';
import ImageUpload from '../other/image-upload/ImageUpload.js';
import Footer from '../other/footer/Footer.js';

import './addPostForm.styles.scss';

const initialFormState = {
    title: '',
    description: '',
    city: '',
    zip_code: '',
};

const AddPostForm = () => {
    const [postData, setPostData] = useState(initialFormState);
    const [isLoading, setIsLoading] = useState(false);
    const [photo, setPhoto] = useState(null);
    const [error, setError] = useState('');
    const { isEditing, setIsEditing, postToEdit, setPostToEdit } =
        useContext(postContext);
    const { push } = useHistory();

    useEffect(() => {
        if (isEditing) {
            setPostData({ ...postToEdit });

            if (postToEdit.photo !== 'null') {
                setPhoto(postToEdit.photo);
            }
        }
        // cleanup
        return () => {
            setIsEditing(false);
            setPostToEdit({});
        };
    }, [
        isEditing,
        postToEdit,
        setIsEditing,
        setPhoto,
        setPostData,
        setPostToEdit,
    ]);

    const handleChange = (e) => {
        setPostData({
            ...postData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const post = {
            ...postData,
            photo: photo ? photo : null,
        };

        if (isEditing) {
            axiosWithAuth()
                .put(`/posts/${postToEdit.id}`, post)
                .then(() => {
                    setIsEditing(false);
                    setPostToEdit({});
                    setPostData(initialFormState);
                    setIsLoading(false);
                    scrollToTop();
                    push(`/dashboard`);
                })
                .catch((err) => {
                    setIsLoading(false);
                    setError(err.response.data.message);
                    console.log(
                        'Put request error: ',
                        err.response.data.message
                    );
                });
        } else {
            axiosWithAuth()
                .post('/posts', post)
                .then(() => {
                    setIsLoading(false);
                    setPostData(initialFormState);
                    scrollToTop();
                    push('/dashboard');
                })
                .catch((err) => {
                    setIsLoading(false);
                    setError(err.response.data.message);
                    console.log(
                        'Add form post error: ',
                        err.response.data.message
                    );
                });
        }
    };
    return (
        <div className="pageContainer">
            <ProtectedHeader />
            <div className="addFormContainer">
                {isEditing ? <h2>Edit Your Post</h2> : <h2>Add a New Post</h2>}

                <form onSubmit={handleSubmit}>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        name="title"
                        onChange={handleChange}
                        value={postData.title}
                        id="title"
                        required
                    />

                    <label htmlFor="description">Description</label>
                    <textarea
                        type="textarea"
                        name="description"
                        onChange={handleChange}
                        value={postData.description}
                        id="description"
                        required
                    />

                    <label htmlFor="city">City</label>
                    <input
                        type="text"
                        name="city"
                        onChange={handleChange}
                        value={postData.city}
                        id="city"
                        required
                    />

                    <label htmlFor="zip_code">Zip Code</label>
                    <input
                        type="text"
                        name="zip_code"
                        onChange={handleChange}
                        value={postData.zip_code}
                        id="zip code"
                        required
                    />

                    <ImageUpload photo={photo} setPhoto={setPhoto} />

                    {error && <p>{error}</p>}
                    {isLoading ? (
                        <button>
                            <CircularProgress color="primary" size="20px" />
                        </button>
                    ) : (
                        <button>Submit</button>
                    )}
                    <button onClick={() => setPostData(initialFormState)}>
                        Reset
                    </button>
                    <button
                        onClick={() => {
                            setPostData(initialFormState);
                            setIsEditing(false);
                            setPostToEdit({});
                            push('/dashboard');
                        }}
                    >
                        Cancel
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default AddPostForm;
