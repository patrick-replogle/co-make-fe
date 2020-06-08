import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import CircularProgress from "@material-ui/core/CircularProgress";

import { axiosWithAuth } from "../../utils/axiosWithAuth.js";
import AuthHeader from "../headers/AuthHeader.js";

const validationSchema = Yup.object({
  username: Yup.string().required("username required"),
  password: Yup.string().required("password required"),
});

const initialLoginState = {
  username: "",
  password: "",
};

const Login = (props) => {
  return (
    <div>
      <AuthHeader />
      <div className="authContainer">
        <h1>Login Below:</h1>
        <Formik
          initialValues={initialLoginState}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm, setSubmitting, setStatus }) => {
            setSubmitting(true);
            setStatus(false);
            axiosWithAuth()
              .post("/auth/login", values)
              .then((res) => {
                localStorage.setItem("coMakeToken", res.data.token);
                localStorage.setItem("userId", res.data.id);
                localStorage.setItem("message", res.data.message);
                resetForm(initialLoginState);
                props.history.push("/dashboard");
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

              {isSubmitting ? (
                <button>
                  <CircularProgress color="primary" size="20px" />
                </button>
              ) : (
                <button type="submit">Submit</button>
              )}
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
