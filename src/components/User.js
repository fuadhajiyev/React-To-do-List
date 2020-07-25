//rcc
import React from "react";
import PropTypes from "prop-types";
import UserConsumer from "../context";
import axios from  "axios";
import {Link} from "react-router-dom";

class User extends React.Component {
  state = {
    isVisible: true
  };
  static defaultProps = {
    ad: "no name",
    soyad: "no lastName",
    adress: "no adress",
    salary: "no salary"
  };
  //arrow func auto bind edir
  Fullread = e => {
    console.log(e.target);
    this.setState({
      isVisible: !this.state.isVisible
    });
  };

  onDeleteUser = async(dispatch, e) => {
    const { id } = this.props;
    //delete request
  await axios.delete(`http://localhost:3004/users/${id}`);

    dispatch({ type: "DELETE_USER", payload: id });
    //consumer Dispatch
  };

  // constructor(props) {
  //   super(props);
  // this.Fullread=this.Fullread.bind(this)
  //   this.state = {
  //     isVisible: false,
  //   };
  // }

  render() {
    //Destructions
    const {id, ad, soyad, adress, salary,} = this.props;
    const { isVisible } = this.state;

    return (
      <UserConsumer>
        {value => {
          const { dispatch } = value;
          return (
          
           
              <div className="person">
              <div className="card mb-2">
                <h3 className="card-header" onClick={this.Fullread.bind()}>
                  Form{" "}
                  <i
                    onClick={this.onDeleteUser.bind(this, dispatch)}
                    className="fa fa-trash-o  pl-5  "
                    aria-hidden="true"
                    style={{ cursor: "pointer" }}
                  ></i>{" "}
                </h3>

                {isVisible ? (
                  <div className="card-body">
                    <span className="list-group-item list-group-item-action list-group-item-primary">
                      {" "}
                      name : {ad}{" "}
                    </span>
                    <span className="list-group-item list-group-item-action list-group-item-primary">
                      {" "}
                      lastname : {soyad}{" "}
                    </span>
                    <span className="list-group-item list-group-item-action list-group-item-primary">
                      {" "}
                      address : {adress}{" "}
                    </span>
                    <span className="list-group-item list-group-item-action list-group-item-primary">
                      {" "}
                      salary : {salary}{" "}
                    </span>
                  <Link to ={`edit/${id}`} className="btn btn-dark btn-block" >Update User</Link>
                  </div>
                ) : null}
              </div>
            </div>
     
         );
        }}
      </UserConsumer>
    );
  }
}
User.propTypes = {
  ad: PropTypes.string.isRequired,
  soyad: PropTypes.string.isRequired
  
};

export default  User;
