import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { withRouter } from 'react-router-dom';

import { axiosWithAuth } from '../../utils/axiosWithAuth.js';
import { postContext } from '../../contexts/postContext.js';

const ProfileIssueCard = (props) => {
  const { setIsEditing, setPostToEdit } = useContext(postContext);

  if (props.post.post_image_url === '') {
    props.post.post_image_url =
      'https://pngimage.net/wp-content/uploads/2018/05/default-png-6.png';
  }

  const fetchPosts = () => {
    axiosWithAuth()
      .get('/posts/by/user')
      .then((res) => {
        console.log(res.data);
        props.setUserPosts(res.data.sort((a, b) => b.votes - a.votes));
      })
      .catch((err) => {
        console.log('error fetching: ', err.response.data.message);
      });
  };

  const handleEdit = (post) => {
    setPostToEdit(post);
    setIsEditing(true);
    props.history.push('/addpost');
  };

  const deletePost = (id) => {
    axiosWithAuth()
      .delete(`/posts/${id}`)
      .then(() => {
        fetchPosts();
      })
      .catch((err) => {
        console.log('Error deleting post: ', err.response.data.message);
      });
  };

  function formatDate(string) {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(string).toLocaleDateString([], options);
  }

  const dateString = formatDate(props.post.createdAt);

  return (
    <div className="profileIssueCard">
      <div>
        <p>{props.post.title}</p>
      </div>
      <div>
        <p>Posted on {dateString}</p>
        <Button
          size="small"
          variant="contained"
          startIcon={<EditIcon />}
          onClick={() => handleEdit(props.post)}
        >
          Edit
        </Button>
        <Button
          size="small"
          variant="contained"
          startIcon={<DeleteIcon />}
          onClick={() => deletePost(props.post.id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default withRouter(ProfileIssueCard);
