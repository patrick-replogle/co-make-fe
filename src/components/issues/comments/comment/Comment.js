import React, { useContext } from 'react';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import jwt from 'jwt-decode';
import moment from 'moment';

import { postContext } from '../../../../contexts/postContext.js';

import './comment.styles.scss';

const Comment = ({ comment, deleteComment }) => {
    const { setIsEditing, setCommentToEdit } = useContext(postContext);
    const token = localStorage.getItem('coMakeToken');
    const decodedToken = jwt(token);

    return (
        <div key={comment.id} className="commentCard">
            <div className="content">
                <div className="header">
                    <p style={{ fontWeight: 'bold' }}>
                        {comment.username}&nbsp;
                    </p>
                    <p>
                        {moment(comment.created_at).format('lll')} {}
                    </p>
                </div>
                {decodedToken.id === comment.user_id && (
                    <div className="iconContainer">
                        <DeleteIcon
                            className="icon"
                            onClick={() => deleteComment(comment.id)}
                        />
                        <CreateIcon
                            className="icon"
                            style={{ marginLeft: '10px' }}
                            onClick={() => {
                                setCommentToEdit(comment);
                                setIsEditing(true);
                            }}
                        />
                    </div>
                )}
            </div>
            <p style={{ marginLeft: '3%' }}>{comment.text}</p>
        </div>
    );
};

export default Comment;
