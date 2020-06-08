import React, { useEffect } from "react";
import jwt from "jwt-decode";

import { axiosWithAuth } from "../../utils/axiosWithAuth";

const CardComments = ({ id, comments, setComments }) => {
  const token = localStorage.getItem("coMakeToken");
  const decodedToken = jwt(token);

  useEffect(() => {
    fetchComments();
  }, [id, setComments]);

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
    <div className="commentList">
      {comments.map((comment) => {
        return (
          <div key={comment.id} className="comment">
            <p style={{ fontWeight: "bold" }}>{comment.username}&nbsp;</p>
            <div>
              <p>{comment.text}</p>
            </div>
            {decodedToken.id === comment.user_id && (
              <>
                <button onClick={() => deleteComment(comment.id)}>
                  delete
                </button>
                <button>edit</button>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CardComments;
