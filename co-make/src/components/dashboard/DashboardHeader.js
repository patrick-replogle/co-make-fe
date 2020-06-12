import React from "react";
import { useHistory } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import PersonIcon from "@material-ui/icons/Person";
import SearchIcon from "@material-ui/icons/Search";

const DashboardHeader = (props) => {
  const { push } = useHistory();

  return (
    <div className="profileHeader">
      <h3>CoMake</h3>
      <div className="navBarRight">
        <AddIcon
          onClick={() => push("/addpost")}
          style={{ color: "white", fontSize: "2.5rem", cursor: "pointer" }}
        />
        <SearchIcon
          onClick={() => props.setShowSearch(!props.showSearch)}
          style={{ color: "white", fontSize: "2.5rem", cursor: "pointer" }}
        />
        <PersonIcon
          onClick={() => push("/user/posts")}
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

export default DashboardHeader;
