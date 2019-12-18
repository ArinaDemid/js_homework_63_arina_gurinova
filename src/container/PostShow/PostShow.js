import React, {Component} from "react";
import Moment from 'react-moment';
import axios from '../../axios-api';
import './PostShow.css';
import {Button} from 'reactstrap';
import {Route} from "react-router-dom";
import EditPost from "../EditPost/EditPost";
import Spinner from '../../components/Spinner/Spinner';

class PostShow extends Component {
  state = {
    id: '',
    datetime: '',
    title: '', 
    description: '',
    loading: false
  }

  componentDidMount() {
    this.getPost();
  }

  async getPost() {
    this.setState({loading: true});
    const response = await axios('/posts/' + this.props.match.params.id  + '.json');
    if (response.status === 200) {
      const post = response.data;
      this.setState({id: post.id, datetime: post.datetime, title: post.title, description: post.description, loading: false});
    }
  }

  delete = event => {
    event.preventDefault();

    this.setState({loading: true});

    this.deleteAPI();
    this.setState({loading: false});
  };

  async deleteAPI(){
    const response = await axios.delete('/posts/' + this.props.match.params.id + '.json');
    if (response.status === 200){
      this.props.history.push('/');
    }
  }

  render() {
    
    const state = this.state;
    let posts = null;
    if (state && !this.state.loading) {
      posts = (
        <div className='PostShow'>
          <p className='PostShow_time_text'>Created on: </p>
          <Moment format="DD-MM-YYYY hh:mm:ss" className='PostShow_time'>{this.state.datetime}</Moment>
          <p className='PostShow_title'>Title: {this.state.title}</p>
          <p className='PostShow_description'>Description: {this.state.description}</p>
          <div className="PostShow_btns">
              <Button type="button" className="PostShow_button" 
                onClick={() => this.props.history.push("/posts/" + this.props.match.params.id + "/edit")} 
              >Change post</Button>
              <Button type="button" className="PostShow_delete" onClick={this.delete}>Delete</Button>
          </div>
          <Route path={"/posts/" + this.props.match.params.id + "/edit"} 
            render = {props => (<EditPost 
              title={this.state.title}
              description={this.state.description}
              id={this.state.id}
              datetime={this.state.datetime}
            />)}
          />
        </div>
      )
    } if(state && this.state.loading) {
      posts = <Spinner />;
    }

    return (
      <div>
        {posts}
      </div>
      
    )
  }
};

export default PostShow;