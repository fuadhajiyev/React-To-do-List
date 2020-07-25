import React from "react";
import Navbar from "./components/navbar";
import Users from "./components/Users";
import UpdateUser from "./form/UpdateUser";
import AddUser from "./form/AddUser";
import NotFound from "./components/NotFound";
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import "./App.css";

// const Home = () =>{
//   return (
//     <h3>Home Page</h3>
//   )
// }
// const About = () =>{
//   return (
//     <h3>About Page</h3>
//   )
// }
class App extends React.Component {

  render() {
    return (

      <Router>
      <div className="App">
        <div className="container">
      <Navbar title="To do List with: Context Api" />

        <Switch>
          <Route exact path ="/" component = {Users} />
          <Route exact path ="/add" component = {AddUser} />
          <Route exact path ="/edit/:id" component = {UpdateUser}/>
          <Route component = {NotFound}/>


        </Switch>
         
          </div>
      </div>
      </Router>
    );
  }
}

export default App;
