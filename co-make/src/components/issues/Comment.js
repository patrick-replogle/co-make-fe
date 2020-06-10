import React, { useContext } from "react";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import jwt from "jwt-decode";
import moment from "moment";

import { axiosWithAuth } from "../../utils/axiosWithAuth.js";
import { postContext } from "../../contexts/postContext.js";

const Comment = ({ comment, setComments, postId }) => {
  const { setIsEditing, setCommentToEdit } = useContext(postContext);
  const token = localStorage.getItem("coMakeToken");
  const decodedToken = jwt(token);

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
    <div key={comment.id} className="commentCard">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", margin: "0 3%" }}>
          <p style={{ fontWeight: "bold" }}>{comment.username}&nbsp;</p>
          <p>{moment(comment.created_at).startOf("day").fromNow()}</p>
        </div>
        {decodedToken.id === comment.user_id && (
          <div style={{ display: "flex", marginRight: "3%" }}>
            <DeleteIcon
              style={{ fontSize: "22px", cursor: "pointer" }}
              onClick={() => deleteComment(comment.id)}
            />
            <CreateIcon
              style={{
                fontSize: "22px",
                cursor: "pointer",
                marginLeft: "10px",
              }}
              onClick={() => {
                setCommentToEdit(comment);
                setIsEditing(true);
              }}
            />
          </div>
        )}
      </div>
      <p style={{ marginLeft: "3%" }}>{comment.text}</p>
    </div>
  );
};

export default Comment;
