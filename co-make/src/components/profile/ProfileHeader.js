import React from "react";
import { useHistory } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import AddIcon from "@material-ui/icons/Add";

const ProfileHeader = () => {
  const { push } = useHistory();

  return (
    <div className="profileHeader">
      <h3>CoMake</h3>
      <div className="navBarRight">
        <HomeIcon
          onClick={() => push("/dashboard")}
          style={{ color: "white", fontSize: "2.5rem", cursor: "pointer" }}
        />
        <AddIcon
          onClick={() => push("/addpost")}
          style={{ color: "white", fontSize: "2.5rem", cursor: "pointer" }}
        />
        <p
          onClick={() => {
            localStorage.removeItem("coMakeToken");
            push("/login");
          }}
          style={{ color: "white", fontSize: "1.6rem", cursor: "pointer" }}
        >
          Logout
        </p>
      </div>
    </div>
  );
};

export default ProfileHeader;
