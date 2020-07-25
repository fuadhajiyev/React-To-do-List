// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";
import {Link} from "react-router-dom";

export function Navbar(props) {
  return (
    <div>
      <h2>{props.title}</h2>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          
          <Link to="/add">Add User</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;

Navbar.defaultProps = {
  title: "Default App"
};
