import React, {Component} from 'react';
import {Button, Form, FormGroup, Input, Label} from 'reactstrap';
import './ChangePost.css';
import axios from '../../axios-api';
import {convertToRaw } from 'draft-js';
import { Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, ContentState } from 'draft-js';
import nanoid from 'nanoid';

class ChangePost extends Component {

  state = {
    title: '', 
    description: '',
    loading: false,
    editorState: '',
  }

  valueChange = event => {
    const name =event.target.name;
    this.setState({[name]: event.target.value});
  };

  submit = event => {
    event.preventDefault();

    this.setState({loading: true});
    const editorInput = convertToRaw(this.state.editorState.getCurrentContent()).blocks[0].text;

    const post = {
      id: nanoid(),
      datetime: new Date(),
      title: this.state.title,
      description: editorInput
    };

    axios.post('/posts.json', post).finally(() => {
      this.setState({loading: false});
      this.props.history.push('/');
    });

    const editorState = EditorState.push(this.state.editorState, ContentState.createFromText(''));
    this.setState({title: '', description: '', editorState});
  };

  onChange = editorState => {
    this.setState({
      editorState
    });
  }; 

  render() {
    return (
      <div className="ChangePost_block">
        <h2 className="ChangePost_title">Change your post</h2>
        <Form className="ChangePost_form" onSubmit={this.submit}>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0 AddPost_group">
            <Label for="title">Title</Label>
            <Input required type="text" name="title" id="title" onChange={this.valueChange} value={this.state.title}
            />
          </FormGroup>
          <FormGroup className="ChangePost_group">
            <Label for="description">Description</Label>
            <Editor
              editorState={this.state.editorState}                   
              wrapperClassName="demo-wrapper"              
              editorClassName="editer-content"
              onEditorStateChange={this.onChange}
            />
          </FormGroup>
          <Button type="submit" className="ChangePost_button">Save</Button>
        </Form>
      </div>
    )
  }
};

export default ChangePost;