import React, {Component} from 'react';
import  '../About/About.css';
import axios from '../../axios-api';
import Image from './AboutImage/Funny-People.jpg';
import Spinner from '../../components/Spinner/Spinner';

class About extends Component {
  
  state = {
    title: '',
    text: '',
    loading: false
  };

  componentDidMount() {
    this.getAbout();
  }

  async getAbout() {
    this.setState({loading: true});
    const response = await axios('/about.json');
    if (response.status === 200) {
      const messages = response.data;
      this.setState({title: messages.title, text: messages.text, loading: false});
    }
  }

  render() {

    let about = (
      <div>
        <h3 className="AboutTitle">{this.state.title}</h3>
        <p>{this.state.text}</p>
      </div>
    )

    if (this.state.loading) {
      about = <Spinner/>;
    }

    return (
      <div className="About">
        <img className="AboutImg" src={Image} alt="AboutImg"></img>
        {about}
      </div>
      )
    }
  }
  
export default About;