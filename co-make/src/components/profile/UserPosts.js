import React from "react";
import ProfileIssueCard from "./ProfileIssueCard.js";

const UserPosts = ({ userPosts, setUserPosts }) => {
  return (
    <div className="postList">
      {userPosts.length < 1 ? (
        <p>You currently have no active posts</p>
      ) : (
        <p>You have {userPosts.length} active posts</p>
      )}
      {userPosts.map((post) => {
        return (
          <div className="profileIssueCardContainer">
            <ProfileIssueCard
              post={post}
              key={post.id}
              setUserPosts={setUserPosts}
            />
          </div>
        );
      })}
    </div>
  );
};

export default UserPosts;
