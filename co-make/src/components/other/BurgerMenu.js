import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useHistory, useLocation } from "react-router-dom";

const BurgerMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { push } = useHistory();
  const { pathname } = useLocation();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (url) => {
    setAnchorEl(null);
    push(url);
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MenuIcon style={{ fontSize: "4rem", color: "white" }} />
      </Button>

      {pathname === "/dashboard" && (
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleClose("/addpost")}>
            Create Post
          </MenuItem>
          <MenuItem onClick={() => handleClose("/user/posts")}>
            View Profile
          </MenuItem>
          <MenuItem
            onClick={() => {
              localStorage.removeItem("coMakeToken");
              handleClose("/login");
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      )}

      {pathname === "/addpost" && (
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleClose("/dashboard")}>Home</MenuItem>
          <MenuItem onClick={() => handleClose("/user/posts")}>
            View Profile
          </MenuItem>
          <MenuItem
            onClick={() => {
              localStorage.removeItem("coMakeToken");
              handleClose("/login");
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      )}

      {pathname === "/user/posts" && (
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleClose("/dashboard")}>Home</MenuItem>
          <MenuItem onClick={() => handleClose("/addpost")}>
            Create Post
          </MenuItem>
          <MenuItem
            onClick={() => {
              localStorage.removeItem("coMakeToken");
              handleClose("/login");
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      )}

      {pathname === "/profile_form" && (
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleClose("/dashboard")}>Home</MenuItem>
          <MenuItem onClick={() => handleClose("/addpost")}>
            Create Post
          </MenuItem>
          <MenuItem onClick={() => handleClose("/user/posts")}>
            View Profile
          </MenuItem>
          <MenuItem
            onClick={() => {
              localStorage.removeItem("coMakeToken");
              handleClose("/login");
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      )}
    </div>
  );
};

export default BurgerMenu;
