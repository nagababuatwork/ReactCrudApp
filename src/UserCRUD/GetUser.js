import React from 'react';
import { Table,Button } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

const apiUrl = 'http://localhost:2719/Api/UserInfoes';

class UserList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
           error:null,
           users:[],
           response: {}
        }
    }

    componentDidMount(){
       axios.get(apiUrl + '/GetUserDetails/').then(response => response.data).then(
            (result)=>{
                this.setState({
                    users:result
                });
            },
            (error)=>{
                this.setState({error});
            }
        )
    }
    
    deleteUser(userId) {
      const { users } = this.state;   
     axios.delete(apiUrl + '/DeleteUserDetails/' + userId).then(result=>{       
        this.setState({
          response:result,
          users:users.filter(user=>user.userId !== userId)
        });
        toast.success("User deleted!");
      });
    }

    render(){       
        const{error,users}=this.state;
        if(error){
            return(
                <div>Error:{error.message}</div>
            )
        }
        else
        {
            return(
         <div>
                  <Table>
                    <thead className="btn-primary">
                      <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>MobileNo</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(user => (
                        <tr key={user.userId}>
                          <td>{user.firstName}</td>
                          <td>{user.lastName}</td>
                          <td>{user.userName}</td>
                          <td>{user.email}</td>
                          <td>{user.mobileNo}</td>
                          <td><Button variant="info" onClick={() => this.props.editUser(user.userId)}>Edit</Button>  &nbsp;&nbsp;&nbsp;
                          <Button variant="danger" onClick={() => this.deleteUser(user.userId)}>Delete</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )
        }
    }
}

export default UserList;