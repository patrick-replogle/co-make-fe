import React, { useState, useEffect, useContext } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import { postContext } from '../../contexts/postContext.js';
import { axiosWithAuth } from '../../utils/axiosWithAuth.js';

import IssueLink from './issue-link/IssueLink.js';
import SearchBar from './search-bar/SearchBar.js';
import ProtectedHeader from '../other/protected-header/ProtectedHeader.js';
import Footer from '../other/footer/Footer.js';

import './dashboard.styles.scss';

const Dashboard = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [searchErr, setSearchErr] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const { posts, setPosts } = useContext(postContext);

    useEffect(() => {
        setIsLoading(true);
        axiosWithAuth()
            .get('/posts')
            .then((res) => {
                setIsLoading(false);
                setPosts(res.data.sort((a, b) => b.votes - a.votes));
            })
            .catch((err) => {
                setIsLoading(false);
                console.log('Error fetching: ', err);
            });
    }, [setPosts]);

    if (isLoading) {
        return (
            <div className="loading">
                <CircularProgress color="primary" size="100px" />
            </div>
        );
    } else {
        return (
            <div className="pageContainer">
                <ProtectedHeader
                    showSearch={showSearch}
                    setShowSearch={setShowSearch}
                />
                {showSearch && <SearchBar setSearchErr={setSearchErr} />}
                {searchErr && <p style={{ color: 'crimson' }}>{searchErr}</p>}
                <div className="dashboardPostContainer">
                    {posts.map((post) => {
                        return (
                            <IssueLink
                                post={post}
                                setPosts={setPosts}
                                key={post.id}
                            />
                        );
                    })}
                </div>
                <Footer />
            </div>
        );
    }
};

export default Dashboard;
