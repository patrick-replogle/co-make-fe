import React, { useState, useEffect } from "react";

import { axiosWithAuth } from "../../utils/axiosWithAuth";

const CardComments = ({ id }) => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    axiosWithAuth()
      .get(`/posts/${id}/comments`)
      .then((res) => {
        console.log(res.data);
        setComments(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div>
      {comments.map((comment) => {
        return (
          <div key={comment.id}>
            <p>{comment.text}</p>
            <p>{comment.username}</p>
          </div>
        );
      })}
    </div>
  );
};

export default CardComments;
