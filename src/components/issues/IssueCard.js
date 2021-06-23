import React, { useEffect, useState } from 'react';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

import ProtectedHeader from '../other/protected-header/ProtectedHeader.js';
import { axiosWithAuth } from '../../utils/axiosWithAuth.js';
import { formatDate } from '../../utils/functions';
import IssueComments from './comments/Comments.js';
import AddComment from './add-comment/AddComment.js';
import volunteering from '../../img/volunteering.jpg';
import Footer from '../other/footer/Footer.js';
import LoadingSpinner from '../other/loading-spinner/LoadingSpinner.js';

import './issueCard.styles.scss';

const IssueCard = (props) => {
    const [issue, setIssue] = useState({});
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const postId = props.match.params.id;

    useEffect(() => {
        setIsLoading(true);
        axiosWithAuth()
            .get(`/posts/${postId}`)
            .then((res) => {
                setIssue(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err);
            });
    }, [postId]);

    const fetchPosts = () => {
        axiosWithAuth()
            .get(`/posts/${postId}`)
            .then((res) => {
                setIssue(res.data);
            })
            .catch((err) => {
                console.log('error fetching: ', err.response.data.message);
            });
    };

    const upVotePost = (postId) => {
        axiosWithAuth()
            .post(`/posts/${postId}/increment/votes`)
            .then(() => {
                fetchPosts();
            })
            .catch((err) => {
                console.log('upvote error: ', err.response.data.message);
            });
    };

    if (isLoading) {
        return <LoadingSpinner />;
    } else {
        return (
            <div className="pageContainer">
                <ProtectedHeader />
                <div className="issueCardContainer">
                    <div className="card">
                        <div>
                            <img
                                src={
                                    issue.photo !== 'null'
                                        ? issue.photo
                                        : volunteering
                                }
                                alt="issue avatar"
                            />
                        </div>
                        <h2>{issue.title}</h2>
                        <p>{issue.description}</p>
                        <p>
                            Location: {issue.city}, {issue.zip_code}
                        </p>
                        <p>
                            Created by {issue.authorUsername} on{' '}
                            {formatDate(issue.createdAt)}
                        </p>
                        <div className="likeContainer">
                            <ThumbUpIcon
                                onClick={() => upVotePost(issue.id)}
                                className="icon"
                            />
                            <p>{issue.votes}</p>
                        </div>
                    </div>
                    <div className="commentsContainer">
                        <AddComment
                            postId={postId}
                            comments={comments}
                            setComments={setComments}
                        />
                        <IssueComments
                            postId={postId}
                            comments={comments}
                            setComments={setComments}
                        />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
};

export default IssueCard;
