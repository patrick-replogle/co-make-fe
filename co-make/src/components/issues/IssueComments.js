import React, { useEffect } from "react";

import { axiosWithAuth } from "../../utils/axiosWithAuth";

const CardComments = ({ id, comments, setComments }) => {
  useEffect(() => {
    axiosWithAuth()
      .get(`/posts/${id}/comments`)
      .then((res) => {
        console.log(res.data);
        setComments(res.data);
      })
      .catch((err) => console.log(err));
  }, [id, setComments]);

  return (
    <div className="commentsContainer">
      {comments.map((comment) => {
        return (
          <div key={comment.id} className="comment">
            <p>{comment.text}</p>
            <p>{comment.username}</p>
          </div>
        );
      })}
    </div>
  );
};

export default CardComments;
