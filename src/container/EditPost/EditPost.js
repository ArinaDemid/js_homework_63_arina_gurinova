import React, {Component} from 'react';
import {Button, Form, FormGroup, Input, Label} from 'reactstrap';
import '../AddPost/AddPost.css';
import axios from '../../axios-api';
import Spinner from '../../components/Spinner/Spinner';

class EditPost extends Component {

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

  valueChange = event => {
    const name =event.target.name;
    this.setState({[name]: event.target.value});
  };

  submit = event => {
    event.preventDefault();

    this.setState({loading: true});

    const put = {
      id: this.state.id,
      datetime: this.state.datetime,
      title: this.state.title,
      description: this.state.description
    };

    this.updateAPI(put);
    this.setState({title: '', description: ''});
  };

  async updateAPI(put){
    const response = await axios.put('/posts/' + this.props.match.params.id + '.json', put);
    if (response.status === 200){
      this.props.history.push('/');
    }
  }

  render() {

    const state = this.state;
    let posts = null;
    if (state && !this.state.loading) {
      posts = (
        <div className="AddPost_block">
          <h2 className="AddPost_title">Change post</h2>
          <Form className="AddPost_form">
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0 AddPost_group">
              <Label for="title">Title</Label>
              <Input required type="text" name="title" id="title" onChange={this.valueChange} value={this.state.title}
              />
            </FormGroup>
            <FormGroup className="AddPost_group">
              <Label for="description">Description</Label>
              <Input type="textarea" name="description" id="description" onChange={this.valueChange} value={this.state.description}/>
            </FormGroup>
            <div className="AddPost_btns">
              <Button type="button" className="AddPost_button" onClick={this.submit}>Save</Button>
            </div>
          </Form>
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

export default EditPost;