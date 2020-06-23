import axios from "axios";

export const axiosWithAuth = () => {
  const token = localStorage.getItem("coMakeToken");

  return axios.create({
    // baseURL: "https://co-make-be.herokuapp.com/api",
    baseURL: "http://localhost:5000/api",
    headers: {
      Authorization: token,
    },
  });
};
