import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory, useLocation, matchPath } from 'react-router-dom';

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
        <div style={{ margin: '0 30%' }}>
            <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MenuIcon style={{ fontSize: '4.4rem', color: 'white' }} />
            </Button>

            {pathname === '/dashboard' && (
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem
                        style={{ fontSize: '1.6rem' }}
                        onClick={() => handleClose('/addpost')}
                    >
                        Create Post
                    </MenuItem>
                    <MenuItem
                        style={{ fontSize: '1.6rem' }}
                        onClick={() => handleClose('/user/posts')}
                    >
                        View Profile
                    </MenuItem>
                    <MenuItem
                        style={{ fontSize: '1.6rem' }}
                        onClick={() => {
                            localStorage.removeItem('coMakeToken');
                            handleClose('/login');
                        }}
                    >
                        Logout
                    </MenuItem>
                </Menu>
            )}

            {pathname === '/addpost' && (
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem
                        style={{ fontSize: '1.6rem' }}
                        onClick={() => handleClose('/dashboard')}
                    >
                        Home
                    </MenuItem>
                    <MenuItem
                        style={{ fontSize: '1.6rem' }}
                        onClick={() => handleClose('/user/posts')}
                    >
                        View Profile
                    </MenuItem>
                    <MenuItem
                        style={{ fontSize: '1.6rem' }}
                        onClick={() => {
                            localStorage.removeItem('coMakeToken');
                            handleClose('/login');
                        }}
                    >
                        Logout
                    </MenuItem>
                </Menu>
            )}

            {matchPath(pathname, { path: '/post/:id' }) && (
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem
                        style={{ fontSize: '1.6rem' }}
                        onClick={() => handleClose('/dashboard')}
                    >
                        Home
                    </MenuItem>
                    <MenuItem
                        style={{ fontSize: '1.6rem' }}
                        onClick={() => handleClose('/addpost')}
                    >
                        Create Post
                    </MenuItem>
                    <MenuItem
                        style={{ fontSize: '1.6rem' }}
                        onClick={() => handleClose('/user/posts')}
                    >
                        View Profile
                    </MenuItem>
                    <MenuItem
                        style={{ fontSize: '1.6rem' }}
                        onClick={() => {
                            localStorage.removeItem('coMakeToken');
                            handleClose('/login');
                        }}
                    >
                        Logout
                    </MenuItem>
                </Menu>
            )}

            {pathname === '/user/posts' && (
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem
                        style={{ fontSize: '1.6rem' }}
                        onClick={() => handleClose('/dashboard')}
                    >
                        Home
                    </MenuItem>
                    <MenuItem
                        style={{ fontSize: '1.6rem' }}
                        onClick={() => handleClose('/addpost')}
                    >
                        Create Post
                    </MenuItem>
                    <MenuItem
                        style={{ fontSize: '1.6rem' }}
                        onClick={() => {
                            localStorage.removeItem('coMakeToken');
                            handleClose('/login');
                        }}
                    >
                        Logout
                    </MenuItem>
                </Menu>
            )}

            {pathname === '/profile_form' && (
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem
                        style={{ fontSize: '1.6rem' }}
                        onClick={() => handleClose('/dashboard')}
                    >
                        Home
                    </MenuItem>
                    <MenuItem
                        style={{ fontSize: '1.6rem' }}
                        onClick={() => handleClose('/addpost')}
                    >
                        Create Post
                    </MenuItem>
                    <MenuItem
                        style={{ fontSize: '1.6rem' }}
                        onClick={() => handleClose('/user/posts')}
                    >
                        View Profile
                    </MenuItem>
                    <MenuItem
                        style={{ fontSize: '1.6rem' }}
                        onClick={() => {
                            localStorage.removeItem('coMakeToken');
                            handleClose('/login');
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
