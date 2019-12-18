import React, {Component} from 'react';
import Contacts from './container/Contacts/Contacts';
import AllPosts from './container/AllPosts/AllPosts';
import AddPost from './container/AddPost/AddPost';
import About from './container/About/About';
import EditPost from './container/EditPost/EditPost';
import PostShow from './container/PostShow/PostShow';
import './App.css';
import { Route, Switch, BrowserRouter, NavLink } from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div className="App-header">
            <h1 className="App-blog">My blog</h1>
            <nav className="App-nav">
              <NavLink exact to="/" className="link">Home</NavLink>
              <NavLink to="/posts/add/" className="link">Add</NavLink>
              <NavLink to="/about" className="link">About</NavLink>
              <NavLink to="/contacts" className="link">Contacts</NavLink>
            </nav>
          </div>
          <Switch>
            <Route path="/" exact component={AllPosts}/>
            <Route path="/posts" exact component={AllPosts}/>
            <Route path="/posts/add/" exact component={AddPost}/>
            <Route path="/posts/:id" exact component={PostShow}/>
            <Route path="/posts/:id/edit" exact component={EditPost}/>
            <Route path="/about" exact component={About}/>
            <Route path="/contacts" component={Contacts}/>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}
  
export default App;
