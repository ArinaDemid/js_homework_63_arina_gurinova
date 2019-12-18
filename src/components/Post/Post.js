import React, {Component, Fragment} from "react";
import Moment from 'react-moment';
import './Post.css';

class Post extends Component {

  render() {
    return (
      <Fragment >
        <p className='Post_time_text'>Created on: </p>
        <Moment format="DD-MM-YYYY hh:mm:ss" className='Post_time'>{this.props.datetime}</Moment>
        <p className='Post_description'>{this.props.description}</p>
      </Fragment>
    )
  }
};

export default Post;