import React from 'react';
import { useLocation } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';

import BurgerMenu from '../burger-menu/BurgerMenu';

import './protectedHeader.styles.scss';

const DashboardHeader = (props) => {
    const { pathname } = useLocation();

    return (
        <div className="protectedHeader">
            <h3>CoMake</h3>
            <div className="navBarRight">
                {pathname === '/dashboard' && (
                    <SearchIcon
                        onClick={() => props.setShowSearch(!props.showSearch)}
                        className="icon"
                    />
                )}
                <BurgerMenu />
            </div>
        </div>
    );
};

export default DashboardHeader;
