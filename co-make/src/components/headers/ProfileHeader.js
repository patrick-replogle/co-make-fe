import React from "react";
import { withRouter } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const ProfileHeader = (props) => {
  return (
    <div className="profileHeader">
      <h3>CoMake</h3>
      <div className="navBarRight">
        <Fab
          size="medium"
          // className="backButtonMargin"
          style={{ backgroundColor: "#424242", border: "none" }}
          onClick={() => {
            props.history.push("/dashboard");
          }}
        >
          <HomeIcon style={{ color: "white" }} />
        </Fab>
        <Fab
          size="medium"
          // className="backButtonMargin"
          style={{ backgroundColor: "#424242", border: "none" }}
          onClick={() => {
            props.history.push("/addpost");
          }}
        >
          <AddIcon style={{ color: "white" }} />
        </Fab>
        <Fab
          size="medium"
          // className="backButtonMargin"
          style={{ backgroundColor: "#424242", border: "none" }}
          onClick={() => {
            props.history.push("/profile_form");
          }}
        >
          <EditIcon style={{ color: "white" }} />
        </Fab>
        <Fab
          size="medium"
          // className="backButtonMargin"
          style={{ backgroundColor: "#424242", border: "none" }}
          onClick={() => {
            localStorage.removeItem("coMakeToken");
            props.history.push("/login");
          }}
        >
          <ExitToAppIcon style={{ color: "white" }} />
        </Fab>
      </div>
    </div>
  );
};

export default withRouter(ProfileHeader);
