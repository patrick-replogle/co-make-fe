import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CircularProgress from '@material-ui/core/CircularProgress';

import { axiosWithAuth } from '../../utils/axiosWithAuth.js';
import AuthHeader from './AuthHeader.js';
import ImageUpload from '../other/ImageUpload.js';
import Footer from '../other/Footer.js';

const initialUser = {
    username: '',
    password: '',
    email: '',
    first_name: '',
    last_name: '',
    city: '',
    zip_code: '',
};

const passwordErrText = `password must contain at least 1 uppercase and 
lowercase letter, as well as 1 number and symbol`;

const validationSchema = Yup.object({
    username: Yup.string().required('username required').max(50).min(1),
    password: Yup.string()
        .required('password required')
        .max(100)
        .min(6)
        .matches(/[0-9]/, passwordErrText)
        .matches(/[A-Z]/, passwordErrText)
        .matches(/[a-z]/, passwordErrText)
        .matches(/[-+_!@#$%^&*.,?]/, passwordErrText),
    email: Yup.string().required('email required').email(),
    first_name: Yup.string().required('first name required').max(35).min(1),
    last_name: Yup.string().required('last name required').max(35).min(1),
    city: Yup.string().required('city required').max(35).min(1),
    zip_code: Yup.string().required('zip code required').max(35).min(1),
});

const Register = (props) => {
    const [photo, setPhoto] = useState(null);
    return (
        <>
            <AuthHeader />
            <div className="authContainer">
                <Formik
                    initialValues={initialUser}
                    validationSchema={validationSchema}
                    onSubmit={(
                        values,
                        { resetForm, setSubmitting, setStatus }
                    ) => {
                        const newUser = {
                            ...values,
                            photo: photo ? photo : null,
                        };
                        setSubmitting(true);
                        setStatus(false);
                        axiosWithAuth()
                            .post('/auth/register', newUser)
                            .then((res) => {
                                localStorage.setItem('token', res.data.token);
                                resetForm(initialUser);
                                props.history.push('/login');
                            })
                            .catch((err) => {
                                setSubmitting(false);
                                setStatus(err.response.data.message);
                                console.log(
                                    'register error: ',
                                    err.response.data.message
                                );
                            });
                    }}
                >
                    {({
                        touched,
                        handleSubmit,
                        handleChange,
                        values,
                        errors,
                        isSubmitting,
                        status,
                    }) => (
                        <>
                            <h1 style={{ color: '#e01f3d' }}>
                                Register a New Account
                            </h1>
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    onChange={handleChange}
                                    value={values.username}
                                    id="username"
                                />
                                {touched.username && errors.username && (
                                    <p className="errors">{errors.username}</p>
                                )}

                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    value={values.password}
                                    id="password"
                                />
                                {touched.password && errors.password && (
                                    <p className="errors">{errors.password}</p>
                                )}

                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    value={values.email}
                                    id="email"
                                />
                                {touched.email && errors.email && (
                                    <p className="errors">{errors.email}</p>
                                )}

                                <label htmlFor="first_name">First Name</label>
                                <input
                                    type="text"
                                    name="first_name"
                                    onChange={handleChange}
                                    value={values.first_name}
                                    id="first_name"
                                />
                                {touched.first_name && errors.first_name && (
                                    <p className="errors">
                                        {errors.first_name}
                                    </p>
                                )}

                                <label htmlFor="last_name">Last Name</label>
                                <input
                                    type="text"
                                    name="last_name"
                                    onChange={handleChange}
                                    value={values.last_name}
                                    id="last_name"
                                />
                                {touched.last_name && errors.last_name && (
                                    <p className="errors">{errors.last_name}</p>
                                )}

                                <label htmlFor="city">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    onChange={handleChange}
                                    value={values.city}
                                    id="city"
                                />
                                {touched.city && errors.city && (
                                    <p className="errors">{errors.city}</p>
                                )}

                                <label htmlFor="zip_code">Zip Code</label>
                                <input
                                    type="text"
                                    name="zip_code"
                                    onChange={handleChange}
                                    value={values.zip_code}
                                    id="zip_code"
                                />
                                {touched.zip_code && errors.zip_code && (
                                    <p className="errors">{errors.zip_code}</p>
                                )}

                                <ImageUpload
                                    photo={photo}
                                    setPhoto={setPhoto}
                                />

                                <div className="termsOfServiceDiv">
                                    <p>
                                        <span>
                                            By signing up, you agree to CoMake's{' '}
                                            <a href="/register">
                                                Terms of Service
                                            </a>
                                            ,{' '}
                                            <a href="/register">
                                                Privacy Policy
                                            </a>{' '}
                                            <font>and</font>{' '}
                                            <a href="/register">
                                                Cookie Policy
                                            </a>
                                        </span>
                                    </p>
                                </div>

                                {status && <p className="status">{status}</p>}

                                {isSubmitting ? (
                                    <button>
                                        <CircularProgress
                                            color="primary"
                                            size="20px"
                                        />
                                    </button>
                                ) : (
                                    <button type="submit">Submit</button>
                                )}
                            </form>
                        </>
                    )}
                </Formik>
            </div>
            <Footer />
        </>
    );
};

export default Register;
