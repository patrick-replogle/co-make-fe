import React from 'react';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import CircularProgress from '@material-ui/core/CircularProgress';

import { axiosWithAuth } from '../../utils/axiosWithAuth.js';
import AuthHeader from './AuthHeader.js';
import Footer from '../other/Footer.js';

const validationSchema = Yup.object({
    username: Yup.string().required('username required'),
    password: Yup.string().required('password required'),
});

const initialLoginState = {
    username: '',
    password: '',
};

const Login = (props) => {
    return (
        <>
            <AuthHeader />
            <div className="authContainer" style={{ marginTop: '20px' }}>
                <h1 style={{ color: '#e01f3d' }}>Login Below</h1>
                <Formik
                    initialValues={initialLoginState}
                    validationSchema={validationSchema}
                    onSubmit={(
                        values,
                        { resetForm, setSubmitting, setStatus }
                    ) => {
                        setSubmitting(true);
                        setStatus(false);
                        axiosWithAuth()
                            .post('/auth/login', values)
                            .then((res) => {
                                localStorage.setItem(
                                    'coMakeToken',
                                    res.data.token
                                );
                                localStorage.setItem('userId', res.data.id);
                                localStorage.setItem(
                                    'message',
                                    res.data.message
                                );
                                resetForm(initialLoginState);
                                props.history.push('/dashboard');
                            })
                            .catch((err) => {
                                setSubmitting(false);
                                setStatus(err.response.data.message);
                                console.log(
                                    'login error: ',
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
                        <form onSubmit={handleSubmit}>
                            {status && <p className="status">{status}</p>}

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

                            <div className="termsOfServiceDiv">
                                <p>
                                    <span>Don't have an account?&nbsp;</span>
                                    <Link to="/register">Register here</Link>
                                </p>
                            </div>

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
                    )}
                </Formik>
            </div>
            <Footer />
        </>
    );
};

export default Login;
