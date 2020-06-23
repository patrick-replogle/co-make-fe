import React, { useState, useEffect, useContext } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withRouter, Link } from "react-router-dom";

import { axiosWithAuth } from "../../utils/axiosWithAuth.js";
import { userContext } from "../../contexts/userContext.js";
import UserPosts from "./UserPosts.js";
import ProtectedHeader from "../other/ProtectedHeader.js";

const Profile = () => {
  const { user, setUser } = useContext(userContext);
  const [userPosts, setUserPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axiosWithAuth()
      .get(`/users/${localStorage.getItem("userId")}`)
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        setUser(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("err fetching user: ", err.response.data.message);
      });
  }, [setUser]);

  useEffect(() => {
    setIsLoading(true);
    axiosWithAuth()
      .get("/posts/by/user")
      .then((res) => {
        setIsLoading(false);
        setUserPosts(res.data.sort((a, b) => b.votes - a.votes));
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("Error fetching: ", err.response.data.message);
      });
  }, [setUserPosts]);

  if (isLoading) {
    return (
      <div className="loading">
        <CircularProgress color="primary" size="100px" />
      </div>
    );
  } else {
    return (
      <>
        <ProtectedHeader />
        <div className="profileContainer">
          <div className="profileCard">
            <div className="profileCardTopRow">
              {user.photo !== "null" ? (
                <img
                  src={user.photo}
                  alt="user avatar"
                  style={{
                    maxWidth: "150px",
                    height: "150px",
                    borderRadius: "50%",
                    marginBottom: "10px",
                  }}
                />
              ) : (
                <div className="profileAvatar">
                  {String(user.first_name).charAt(0)}
                  {String(user.last_name).charAt(0)}
                </div>
              )}

              <Link to="/profile_form">Update Profile</Link>
            </div>

            <div className="profileFieldContainer">
              <div className="profileFieldDiv">
                <h3>Username</h3>
                <div className="profileField">
                  <p>{user.username}</p>
                </div>
              </div>
              <div className="profileFieldDiv">
                <h3>Email</h3>
                <div className="profileField">
                  <p>{user.email}</p>
                </div>
              </div>
              <div className="profileFieldDiv">
                <h3>First Name</h3>
                <div className="profileField">
                  <p>{user.first_name}</p>
                </div>
              </div>
              <div className="profileFieldDiv">
                <h3>Last Name</h3>
                <div className="profileField">
                  <p>{user.last_name}</p>
                </div>
              </div>

              <div className="profileFieldDiv">
                <h3>City</h3>
                <div className="profileField">
                  <p>{user.city}</p>
                </div>
              </div>
              <div className="profileFieldDiv">
                <h3>Zip Code</h3>
                <div className="profileField">
                  <p>{user.zip_code}</p>
                </div>
              </div>
            </div>

            <UserPosts userPosts={userPosts} setUserPosts={setUserPosts} />
          </div>
        </div>
      </>
    );
  }
};

export default withRouter(Profile);
