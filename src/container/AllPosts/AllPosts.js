import React, {Component} from "react";
import './AllPosts.css';
import axios from '../../axios-api';
import Post from '../../components/Post/Post';
import Spinner from '../../components/Spinner/Spinner';
import { NavLink } from 'react-router-dom';

class AllPosts extends Component {

  state = {
    posts: [],
    loading: false
  };

  componentDidMount() {
    this.getPosts();
  }

  async getPosts() {
    this.setState({loading: true});
    const response = await axios('/posts.json');
    if (response.status === 200) {
      const posts = response.data;
      this.setState({posts, loading: false});
    }
  }

  render() {

    const state = this.state.posts;
    let posts = null;
    if (state && !this.state.loading) {
      posts = (
        Object.keys(state).map(key => (
          <div className='Post' key={key}>
            <Post
              key={state[key].id}
              datetime={state[key].datetime}
              description={state[key].description}
            />
            <NavLink to={'/posts/' + key}>Read more >></NavLink>
          </div>
          
        ))
      )
    } if(state && this.state.loading) {
      posts = <Spinner />;
    } if(!state) {
      posts = <div>There are no entries in the database</div>;
    }
    
    return (
      <div className="AllPosts">
        {posts}
      </div>
    )
  }
};

export default AllPosts;