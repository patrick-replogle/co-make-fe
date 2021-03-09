import React from 'react';
import { useLocation } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';

import BurgerMenu from './BurgerMenu';

const DashboardHeader = (props) => {
    const { pathname } = useLocation();

    return (
        <div className="protectedHeader">
            <h3>CoMake</h3>
            <div className="navBarRight">
                {pathname === '/dashboard' && (
                    <SearchIcon
                        onClick={() => props.setShowSearch(!props.showSearch)}
                        style={{
                            color: 'white',
                            fontSize: '3.5rem',
                            cursor: 'pointer',
                        }}
                    />
                )}
                <BurgerMenu />
            </div>
        </div>
    );
};

export default DashboardHeader;
