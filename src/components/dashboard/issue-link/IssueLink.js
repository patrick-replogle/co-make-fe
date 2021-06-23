import React from 'react';
import { Link } from 'react-router-dom';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

import { axiosWithAuth } from '../../../utils/axiosWithAuth';
import { formatDate } from '../../../utils/functions';
import volunteering from '../../../img/volunteering.jpg';

import './issueLink.styles.scss';

const IssueLink = ({ post, setPosts }) => {
    const fetchPosts = () => {
        axiosWithAuth()
            .get('/posts')
            .then((res) => {
                setPosts(res.data.sort((a, b) => b.votes - a.votes));
            })
            .catch((err) => {
                console.log('error fetching: ', err);
            });
    };

    const upVotePost = (id) => {
        axiosWithAuth()
            .post(`/posts/${id}/increment/votes`)
            .then(() => {
                fetchPosts();
            })
            .catch((err) => {
                console.log('upvote err: ', err.response.data.message);
            });
    };

    return (
        <div className="issueLink">
            <Link to={`/post/${post.id}`}>
                <img
                    src={post.photo !== 'null' ? post.photo : volunteering}
                    alt="issue avatar"
                />
                <h2>
                    {post.title.length > 50
                        ? post.title.slice(0, 50) + '...'
                        : post.title}
                </h2>
                <p>
                    {post.city}, {post.zip_code}{' '}
                </p>
                <p>Created {formatDate(post.createdAt)}</p>
            </Link>
            <div className="thumbsUpContainer">
                <ThumbUpIcon
                    className="icon"
                    onClick={() => upVotePost(post.id)}
                />
                <p>{post.votes}</p>
            </div>
        </div>
    );
};

export default IssueLink;
