import React from 'react';
import { withRouter } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';

const IssueCardHeader = (props) => {
  return (
    <div className="profileHeader">
      <h3>Co-Make</h3>
      <div className="navBarRight">
        <Fab
          size="medium"
          // className="backButtonMargin"
          style={{ backgroundColor: 'white', border: 'none' }}
          onClick={() => {
            props.history.push('/dashboard');
          }}
        >
          <HomeIcon style={{ color: 'black' }} />
        </Fab>
        <Fab
          size="medium"
          // className="backButtonMargin"
          style={{ backgroundColor: 'white', border: 'none' }}
          onClick={() => {
            props.history.push('/addpost');
          }}
        >
          <AddIcon style={{ color: 'black' }} />
        </Fab>
        <Fab
          size="medium"
          // className="backButtonMargin"
          style={{ backgroundColor: 'white', border: 'none' }}
          onClick={() => {
            props.history.push('/user/posts');
          }}
        >
          <PersonIcon style={{ color: 'black' }} />
        </Fab>
        <Fab
          size="medium"
          // className="backButtonMargin"
          style={{ backgroundColor: 'white', border: 'none' }}
          onClick={() => {
            props.history.push('/login');
          }}
        >
          <ExitToAppIcon style={{ color: 'black' }} />
        </Fab>
      </div>
    </div>
  );
};

export default withRouter(IssueCardHeader);
