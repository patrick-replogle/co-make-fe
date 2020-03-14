import React, { useState } from "react";
import { Form, Field, ErrorMessage, Formik } from "formik";
import * as Yup from "yup";

import { axiosWithAuth } from "../../utils/axiosWithAuth.js";

// const initialLoginState = {
//   username: "",
//   password: ""
// };

// const Login = props => {
//   const [signInData, setSignInData] = useState(initialLoginState);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = e => {
//     e.preventDefault();
//     setSignInData({ ...signInData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = e => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError("");
//     axiosWithAuth()
//       .post("/auth/login", signInData)
//       .then(res => {
//         localStorage.setItem("token", res.data.token);
//         localStorage.setItem("userId", res.data.id);
//         localStorage.setItem("message", res.data.message);
//         setIsLoading(false);
//         setSignInData(initialLoginState);
//         props.history.push("/dashboard");
//       })
//       .catch(err => {
//         setIsLoading(false);
//         console.log("error loggin in: ", err);
//         setError(err.message);
//       });
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="username"
//           onChange={handleChange}
//           placeholder="username"
//           value={signInData.username}
//         />
//         <input
//           type="password"
//           name="password"
//           onChange={handleChange}
//           placeholder="password"
//           value={signInData.password}
//         />
//         <button>Submit</button>
//       </form>
//     </div>
//   );
// };

const validationSchema = Yup.object({
  username: Yup.string().required("Username required"),
  password: Yup.string().required("Password required")
});

const Login = props => {
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={values => {
        axiosWithAuth()
          .post("/auth/login", values)
          .then(res => {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userId", res.data.id);
            localStorage.setItem("message", res.data.message);
            props.history.push("/dashboard");
          })
          .catch(err => {
            console.log("error loggin in: ", err);
          });
      }}
    >
      {({ handleSubmit, handleChange, values, errors }) => (
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Submit</button>
        </form>
      )}
    </Formik>
  );
};

export default Login;
