import React, { useEffect, useContext } from "react";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import jwt from "jwt-decode";

import { axiosWithAuth } from "../../utils/axiosWithAuth";
import { postContext } from "../../contexts/postContext.js";

const CardComments = ({ id, comments, setComments }) => {
  const token = localStorage.getItem("coMakeToken");
  const decodedToken = jwt(token);
  const { setIsEditing, setCommentToEdit } = useContext(postContext);

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line
  }, [id]);

  const fetchComments = () => {
    axiosWithAuth()
      .get(`/posts/${id}/comments`)
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
              <div key={comment.id} className="comment">
                <p style={{ fontWeight: "bold" }}>{comment.username}&nbsp;</p>
                <div>
                  <p>{comment.text}</p>
                </div>
                {decodedToken.id === comment.user_id && (
                  <div style={{ display: "flex" }}>
                    <DeleteIcon
                      style={{ fontSize: "22px", cursor: "pointer" }}
                      onClick={() => deleteComment(comment.id)}
                    />
                    <CreateIcon
                      style={{ fontSize: "22px", cursor: "pointer" }}
                      onClick={() => {
                        setCommentToEdit(comment);
                        setIsEditing(true);
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default CardComments;
