import React, { useContext } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { withRouter } from 'react-router-dom';

import { scrollToTop } from '../../../utils/functions';
import { axiosWithAuth } from '../../../utils/axiosWithAuth.js';
import { postContext } from '../../../contexts/postContext.js';
import { formatDate } from '../../../utils/functions';

import './profileIssueCard.styles.scss';

const ProfileIssueCard = ({ post, setUserPosts, history }) => {
    const { setIsEditing, setPostToEdit } = useContext(postContext);
    const dateString = formatDate(post.createdAt);

    const fetchPosts = () => {
        axiosWithAuth()
            .get('/posts/by/user')
            .then((res) => {
                setUserPosts(res.data.sort((a, b) => b.votes - a.votes));
            })
            .catch((err) => {
                console.log('error fetching: ', err.response.data.message);
            });
    };

    const handleEdit = (post) => {
        setPostToEdit(post);
        setIsEditing(true);
        scrollToTop();
        history.push('/addpost');
    };

    const deletePost = (id) => {
        axiosWithAuth()
            .delete(`/posts/${id}`)
            .then(() => {
                fetchPosts();
            })
            .catch((err) => {
                console.log('Error deleting post: ', err.response.data.message);
            });
    };

    return (
        <div className="profileIssueCard">
            <div className="profileIssueCardText">
                <p>{dateString}</p>
                <div className="profileIssueCardIconContainer">
                    <EditIcon
                        className="icon"
                        onClick={() => handleEdit(post)}
                    />
                    <DeleteIcon
                        className="icon"
                        onClick={() => deletePost(post.id)}
                    />
                </div>
            </div>
            <p>{post.title}</p>
        </div>
    );
};

export default withRouter(ProfileIssueCard);
