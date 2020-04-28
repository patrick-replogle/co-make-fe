import React from "react";
import { withRouter } from "react-router-dom";
import Fab from "@material-ui/core/Fab";
import HomeIcon from "@material-ui/icons/Home";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonIcon from "@material-ui/icons/Person";

const AddPostHeader = props => {
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
            props.history.push("/user/posts");
          }}
        >
          <PersonIcon style={{ color: "white" }} />
        </Fab>
        <Fab
          size="medium"
          // className="backButtonMargin"
          style={{ backgroundColor: "#424242", border: "none" }}
          onClick={() => {
            props.history.push("/login");
          }}
        >
          <ExitToAppIcon style={{ color: "white" }} />
        </Fab>
      </div>
    </div>
  );
};

export default withRouter(AddPostHeader);
