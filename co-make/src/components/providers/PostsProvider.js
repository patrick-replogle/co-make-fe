import React, { useState } from "react";

import { postContext } from "../../contexts/postContext.js";

const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [postToEdit, setPostToEdit] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  return (
    <postContext.Provider
      value={{
        posts,
        setPosts,
        postToEdit,
        setPostToEdit,
        isEditing,
        setIsEditing
      }}
    >
      {children}
    </postContext.Provider>
  );
};

export default PostProvider;
