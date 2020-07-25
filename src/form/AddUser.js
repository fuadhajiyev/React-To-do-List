import React, { Component } from "react";
import { Button } from "react-bootstrap";
import UserConsumer from "../context";
import posed from "react-pose";
import axios from "axios";

const Animation = posed.div({
  visible: {
    opacity: 1,
    applyAtStart: {
      display: "block"
    }
  },
  hidden: {
    opacity: 0,
    applyAtEnd: {
      display: "none"
    }
  }
});

// import Navbar from "./components/navbar";

class AddUser extends Component {
  state = {
    visible: false,
    ad: "",
    soyad: "",
    adress: "",
    salary: "",
    error:false,
  };

  changeVisibility = e => {
    this.setState({
      visible: !this.state.visible
    });
  };

  validateForm = () =>{
    const {ad,soyad,adress,salary}=this.state
    if(ad ==="" ||salary === "" || adress === "" ||soyad === ""){
      return false;
    }
    return true;

  }


  changeInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  addUser = async (dispatch, e) => {
    e.preventDefault();
    const { ad, soyad, adress, salary } = this.state;
    const newUser = {
      ad,
      soyad,
      adress,
      salary
    };

    if(!this.validateForm()){
      this.setState({
        error: true
      })
      return
    }

    const response = await axios.post("http://localhost:3004/users", newUser);
    dispatch({ type: "ADD_USER", payload: response.data });
    //Redirect
    this.props.history.push("/");
  };
 
  render() {
    const { visible, ad, soyad, adress, salary, error } = this.state;

    return (
      <UserConsumer>
        {value => {
          const { dispatch } = value;
          return (
            <div>
              <Button
                onClick={this.changeVisibility}
                className="btn btn-warning btn-block"
              >
                <b>{visible ? "Hide Form " : "Show Form"}</b>
              </Button>
              <Animation pose={visible ? "visible" : "hidden"}>
                <div className="card mb-2 add-form">
                  <div className="card-header">
                    <h4>Add User Form</h4>
                  </div>
                  <div className="card-body">
                    {
                      error ?
                      <div className="alert alert-danger">
                        Please check your information and try again
                      </div>
                      :null
                    }


                    <form onSubmit={this.addUser.bind(this, dispatch)}>
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
                        Add user
                      </Button>
                    </form>
                  </div>
                </div>
              </Animation>
            </div>
          );
        }}
      </UserConsumer>
    );
  }
}
export default AddUser;
