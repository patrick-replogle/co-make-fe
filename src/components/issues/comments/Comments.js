import React, { useEffect } from 'react';

import Comment from './comment/Comment';
import { axiosWithAuth } from '../../../utils/axiosWithAuth';

const Comments = ({ postId, comments, setComments }) => {
    useEffect(() => {
        fetchComments();
        // eslint-disable-next-line
    }, [postId]);

    const fetchComments = () => {
        axiosWithAuth()
            .get(`/posts/${postId}/comments`)
            .then((res) => {
                setComments(res.data);
            })
            .catch((err) => console.log(err));
    };

    const deleteComment = (commentId) => {
        axiosWithAuth()
            .delete(`/comments/${commentId}`)
            .then(() => {
                fetchComments();
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            {comments.length > 0 && (
                <div className="commentList">
                    {comments.map((comment) => {
                        return (
                            <Comment
                                key={comment.id}
                                comment={comment}
                                postId={postId}
                                deleteComment={deleteComment}
                            />
                        );
                    })}
                </div>
            )}
        </>
    );
};

export default Comments;
