import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import CircularProgress from "@material-ui/core/CircularProgress";

import { axiosWithAuth } from "../../utils/axiosWithAuth.js";

const validationSchema = Yup.object({
  username: Yup.string().required("username required"),
  password: Yup.string().required("password required")
});

const Login = props => {
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm, setSubmitting, setStatus }) => {
        setSubmitting(true);
        setStatus(false);
        axiosWithAuth()
          .post("/auth/login", values)
          .then(res => {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userId", res.data.id);
            localStorage.setItem("message", res.data.message);
            resetForm({ username: "", password: "" });
            setStatus(true);
            props.history.push("/dashboard");
          })
          .catch(err => {
            setSubmitting(false);
            setStatus(err.response.data.message);
            console.log("login error: ", err.response.data.message);
          });
      }}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        errors,
        isSubmitting,
        status
      }) => (
        <form className="loginForm" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            value={values.username}
            placeholder="username"
          />
          {errors.username && <p className="errors">{errors.username}</p>}
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={values.password}
            placeholder="password"
          />
          {errors.password && <p className="errors">{errors.password}</p>}
          {isSubmitting ? (
            <button>
              <CircularProgress class="spinner" size="10px" />
            </button>
          ) : (
            <button type="submit">Submit</button>
          )}
          {status && <p>{status}</p>}
        </form>
      )}
    </Formik>
  );
};

export default Login;
