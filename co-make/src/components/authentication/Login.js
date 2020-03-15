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
    <div className="loginContainer">
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
            {status && <p className="status">{status}</p>}
            <input
              type="text"
              name="username"
              onChange={handleChange}
              value={values.username}
              placeholder="username"
            />
            <div className="errorContainer">
              {errors.username && <p className="errors">{errors.username}</p>}
            </div>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={values.password}
              placeholder="password"
            />
            <div className="errorContainer">
              {errors.password && <p className="errors">{errors.password}</p>}
            </div>
            {isSubmitting ? (
              <button>
                <CircularProgress color="primary" size="10px" />
              </button>
            ) : (
              <button type="submit">Submit</button>
            )}
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
