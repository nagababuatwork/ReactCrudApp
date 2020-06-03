import React, { Component } from 'react';
import { Container, Button } from 'react-bootstrap';
import UserList from './GetUser';
import AddUser from './AddUser';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
const apiUrl = 'http://localhost:2719/Api/UserInfoes/';

class UserActionApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAddUser: false,
      error: null,
      response: {},
      userData: {},
      isEdituser: false,
      isUserDetails:true,
    }

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.CancelClick = this.CancelClick.bind(this);
  }

  onCreate() {
    this.setState({ isAddUser: true });
    this.setState({ isUserDetails: false,  userData: {} });
  }
  onDetails() {
    this.setState({ isUserDetails: true });
    this.setState({ isAddUser: false,  isEdituser: false });
  }

  CancelClick() {  
    this.setState({ isUserDetails: true });
    this.setState({ isAddUser: false,  isEdituser: false });
  }

  onFormSubmit(data) {   
    if (this.state.isEdituser) {
     axios.put(apiUrl + 'UpdateUserDetails/' + data.userId,data).then(result => {
      this.setState({ isAddUser: true });
      this.setState({ isUserDetails: true });      
        this.setState({
          response:result,  
          isAddUser: false,
          isEdituser: false
        });
        toast.success('User updated!');
      });
    } else {
     
     axios.post(apiUrl +'InsertUserDetails',data).then(result => {        
        this.setState({
          response:result,  
          isAddUser: false,
          isEdituser: false
        });
        toast.success("User added!");
      },
      (error) => {
        if(error.response && error.response.data){
          toast.error(error.response.data);
        }
      });
    }
  
  }

  editUser = userId => {
    this.setState({ isUserDetails: false });
   axios.get(apiUrl + "GetUserDetailsById/" + userId).then(result => {
        this.setState({
          isEdituser: true,
          isAddUser: true,
          userData: result.data         
        });
      },
      (error) => {
        this.setState({ error });
      }
    )
  }


  render() {
  
    let userForm;
    if (this.state.isAddUser || this.state.isEdituser) {
      userForm = <AddUser onFormSubmit={this.onFormSubmit} onCancelClick={this.CancelClick} user={this.state.userData} />
     
    }
  

    return (
      <div className="App">
 <Container>
        <h1 style={{ textAlign: 'center' }}>CRUD Operations in React</h1>
        <hr></hr>
        {!this.state.isUserDetails && <Button variant="primary" onClick={() => this.onDetails()}> User Details</Button>}
        {!this.state.isAddUser && <Button variant="primary" onClick={() => this.onCreate()}>Add User</Button>}
        <br></br>
        {!this.state.isAddUser && <UserList editUser={this.editUser} />}
        {userForm}
        </Container>
        <ToastContainer position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover/>
        <ToastContainer />
      </div>
    );
  }
}
export default UserActionApp;