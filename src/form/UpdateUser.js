import React, { Component } from "react";
import { Button } from "react-bootstrap";
import UserConsumer from "../context";
import axios from "axios";



class UpdateUser extends Component {
  state = {
    ad: "",
    soyad: "",
    adress: "",
    salary: "",
    error: false
  };

  changeInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };


  componentDidMount = async () =>{
      const {id} = this.props.match.params;
      const response = await axios.get(`http://localhost:3004/users/${id}`);
     const {ad,soyad,adress,salary} = response.data;
     this.setState({
         ad,
         soyad,
         adress,
         salary
         
     });

  } 

  validateForm = () =>{
    const {ad,soyad,adress,salary}=this.state
    if(ad ==="" ||salary === "" || adress === "" ||soyad === ""){
      return false;
    }
    return true;
  }

  UpdateUser = async (dispatch, e) => {
    e.preventDefault();
    //update user
    const {ad, soyad, adress, salary} = this.state;
    const {id} = this.props.match.params;

    if(!this.validateForm()){
        this.setState({
          error: true
        })
        return
      }

    const UpdateUser = {
        ad,
        soyad,
        adress,
        salary
    };
     const response = await axios.put(`http://localhost:3004/users/${id}`,UpdateUser)

     dispatch({type:"UPDATE_USER",payload :response.data});

      //Redirect
      this.props.history.push("/");
    
  }

  render() {
    const {  ad, soyad, adress, salary, error } = this.state;

    return (
      <UserConsumer>
        {value => {
          const { dispatch } = value;
          return (
            <div>
              
                <div className="card mb-2 add-form">
                  <div className="card-header">
                    <h4>Update User Form</h4>
                  </div>
                  <div className="card-body">

                  {
                      error ?
                      <div className="alert alert-danger">
                        Please check your information and try again
                      </div>
                      :null
                    }
                    <form onSubmit={this.UpdateUser.bind(this, dispatch)}>
                        <div className="form-group">
                          <label htmlFor="name">Name</label>
                          <input
                            type="text"
                            name="ad"
                            id="name"
                            placeholder="enter name"
                            className="form-control mb-2"
                            value={ad}
                            onChange={this.changeInput}
                          />
                        </div>
                      <div className="form-group">
                        <label htmlFor="Lastname">Lastname</label>
                        <input
                          type="text"
                          name="soyad"
                          id="lastname"
                          placeholder="enter lastname"
                          className="form-control mb-2"
                          value={soyad}
                          onChange={this.changeInput}
                          
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="adress">Adress</label>
                        <input
                          type="text"
                          name="adress"
                          id="adress"
                          placeholder="enter adress"
                          className="form-control mb-2"
                          value={adress}
                          onChange={this.changeInput}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="salary">Salary</label>
                        <input
                          type="text"
                          name="salary"
                          id="salary"
                          placeholder="enter salary"
                          className="form-control mb-2"
                          value={salary}
                          onChange={this.changeInput}
                        />
                      </div>

                      <Button
                        className="btn btn-primary btn-block"
                        type="onsubmit"
                      >
                        Update user
                      </Button>
                    </form>
                  </div>
                </div>
            
            </div>
          );
        }}
      </UserConsumer>
    );
  }
}
export default UpdateUser;
