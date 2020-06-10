import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import CircularProgress from "@material-ui/core/CircularProgress";

import { axiosWithAuth } from "../../utils/axiosWithAuth.js";
import AuthHeader from "../headers/AuthHeader.js";

const initialUser = {
  username: "",
  password: "",
  email: "",
  first_name: "",
  last_name: "",
};

const passwordErrText = `password must contain at least 1 uppercase and 
lowercase letter, as well as 1 number and symbol`;

const validationSchema = Yup.object({
  username: Yup.string().required("username required").max(50).min(1),
  password: Yup.string()
    .required("password required")
    .max(100)
    .min(6)
    .matches(/[0-9]/, passwordErrText)
    .matches(/[A-Z]/, passwordErrText)
    .matches(/[a-z]/, passwordErrText)
    .matches(/[-+_!@#$%^&*.,?]/, passwordErrText),
  email: Yup.string().required("email required").email(),
  first_name: Yup.string().required("first name required").max(35).min(1),
  last_name: Yup.string().required("last name required").max(35).min(1),
});

const Register = (props) => {
  return (
    <>
      <AuthHeader />
      <div className="authContainer">
        <Formik
          initialValues={initialUser}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm, setSubmitting, setStatus }) => {
            setSubmitting(true);
            setStatus(false);
            axiosWithAuth()
              .post("/auth/register", values)
              .then((res) => {
                localStorage.setItem("token", res.data.token);
                resetForm(initialUser);
                props.history.push("/login");
              })
              .catch((err) => {
                setSubmitting(false);
                setStatus(err.response.data.message);
                console.log("login error: ", err.response.data.message);
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
              <h1 style={{ color: "#e01f3d" }}>Register a New Account</h1>
              <form onSubmit={handleSubmit}>
                {status && <p className="status">{status}</p>}
                <input
                  type="text"
                  name="username"
                  onChange={handleChange}
                  value={values.username}
                  placeholder="username"
                />
                {touched.username && errors.username && (
                  <p className="errors">{errors.username}</p>
                )}

                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={values.password}
                  placeholder="password"
                />
                {touched.password && errors.password && (
                  <p className="errors">{errors.password}</p>
                )}

                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                  placeholder="email"
                />
                {touched.email && errors.email && (
                  <p className="errors">{errors.email}</p>
                )}

                <input
                  type="text"
                  name="first_name"
                  onChange={handleChange}
                  value={values.first_name}
                  placeholder="first name"
                />
                {touched.first_name && errors.first_name && (
                  <p className="errors">{errors.first_name}</p>
                )}

                <input
                  type="text"
                  name="last_name"
                  onChange={handleChange}
                  value={values.last_name}
                  placeholder="last name"
                />
                {touched.last_name && errors.last_name && (
                  <p className="errors">{errors.last_name}</p>
                )}

                {isSubmitting ? (
                  <button>
                    <CircularProgress color="primary" size="20px" />
                  </button>
                ) : (
                  <button type="submit">Submit</button>
                )}
              </form>
            </>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Register;
