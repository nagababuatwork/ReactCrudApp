import React from 'react';
import { Row, Form, Col, Button } from 'react-bootstrap';
class AddUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = { submitted: false};
    this.initialState = {
      userId: 0,
      firstName: '',
      lastName: '',
      userName:'',
      email: '',
      password:'',
      createdDate:new Date(),
      mobileNo: '',
      address: '',
      pinCode: '',
    }
    if (props.user.userId) {
      this.state = props.user
    } else {
      this.state = this.initialState;
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.CancelClick = this.CancelClick.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    })
  }

  CancelClick() {  
    this.props.onCancelClick(); 
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ submitted: true });
    if(this.state.firstName !== "" && this.state.lastName !== "" && this.state.userName !== "" && this.state.email !== "" && this.state.mobileNo !== ""){   
    this.props.onFormSubmit(this.state);    
    }
  }
  render() {
    let pageTitle;
    let actionStatus;
    if (this.state.userId) {

      pageTitle = <h2>Edit User</h2>
      actionStatus = <b>Update</b>
    } else {
      pageTitle = <h2>Add User</h2>
      actionStatus = <b>Save</b>
    }
    const { submitted } = this.state;
    return (
      <div>      
        <h2> {pageTitle}</h2>
        <Row>
          <Col sm={7}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="firstName" className={'form-group' + (submitted && !this.state.firstName ? ' has-error' : '')}>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                  placeholder="First Name" />
                   {submitted && !this.state.firstName &&  <div className="help-block">First name is required</div> }
              </Form.Group>
              <Form.Group controlId="lastName" className={'form-group' + (submitted && !this.state.lastName ? ' has-error' : '')}>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                  placeholder="Last Name" />
                   {submitted && !this.state.lastName &&  <div className="help-block">Last name is required</div> }
              </Form.Group>
              <Form.Group controlId="userName" className={'form-group' + (submitted && !this.state.userName ? ' has-error' : '')}>
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  type="text"
                  name="userName"
                  value={this.state.userName}
                  onChange={this.handleChange}
                  placeholder="User Name" />
                  {submitted && !this.state.userName &&  <div className="help-block">User name is required</div> }
              </Form.Group>

              <Form.Group controlId="email" className={'form-group' + (submitted && !this.state.email ? ' has-error' : '')}>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  placeholder="Email" />
                   {submitted && !this.state.email &&  <div className="help-block">email name is required</div> }
              </Form.Group>
              {/* <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="text"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  placeholder="Password" />
              </Form.Group>             */}
              <Form.Group controlId="mobileNo" className={'form-group' + (submitted && !this.state.mobileNo ? ' has-error' : '')}>
                <Form.Label>MobileNo</Form.Label>
                <Form.Control
                  type="text"
                  name="mobileNo"
                  value={this.state.mobileNo}
                  onChange={this.handleChange}
                  placeholder="MobileNo" />
                  {submitted && !this.state.mobileNo &&  <div className="help-block">MobileNo  is required</div> }
              </Form.Group>
              {/* <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={this.state.address}
                  onChange={this.handleChange}
                  placeholder="Address" />
              </Form.Group> */}

              {/* <Form.Group controlId="pinCode">
                <Form.Label>PinCode</Form.Label>
                <Form.Control
                  type="text"
                  name="pinCode"
                  value={this.state.pinCode}
                  onChange={this.handleChange}
                  placeholder="PinCode" />
              </Form.Group> */}
              <Form.Group>
                <Form.Control type="hidden" name="UserId" value={this.state.userId} />
                <Button variant="success" type="submit">{actionStatus}</Button>&nbsp;   
                <Button variant="info" type="button" onClick={this.CancelClick}>Cancel</Button>          
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}

export default AddUser;