import React from 'react';
import ProfileIssueCard from '../profile-issue-card/ProfileIssueCard.js';

const UserPosts = ({ userPosts, setUserPosts }) => {
    return (
        <div className="postListContainer">
            {userPosts.length < 1 ? (
                <p>You currently have no active posts</p>
            ) : (
                <p>You have {userPosts.length} active posts</p>
            )}
            <div className="activePosts">
                {userPosts.map((post) => {
                    return (
                        <ProfileIssueCard
                            post={post}
                            key={post.id}
                            setUserPosts={setUserPosts}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default UserPosts;
