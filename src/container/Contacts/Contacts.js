import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
import './Contacts.css';

class Contacts extends Component {

  formSubmit = event => {
    event.preventDefault();
  };

  render() {
    return (
      <div className="Contacts">
        <Form onSubmit={this.formSubmit}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="email" name="email" id="email" placeholder="Your email" />
          </FormGroup>
          <FormGroup>
            <Label for="tel">Phone number</Label>
            <Input type="text" name="tel" id="tel" placeholder="Your phone number" />
          </FormGroup>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input type="text" name="name" id="name" placeholder="Your name" />
          </FormGroup>
          <FormGroup>
            <Label for="exampleText">Where would you like to fly?</Label>
            <Input type="textarea" name="text" id="exampleText" />
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" />{' '}
              Do you agree to receive the offer by email
            </Label>
          </FormGroup>
          <Button>Submit</Button>
        </Form>
      </div>
    );
  }
}

export default Contacts;