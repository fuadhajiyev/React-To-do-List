import React, { Component } from "react";
import User from "./User";
import UserConsumer from "../context";


class Users extends Component {
  render() {
    return (
      <UserConsumer>
      { value =>
          {
          const { users } = value;
          return (
            <div>
              {users.map(user => {
                return (
                  <User
                    key={user.id}
                    id={user.id}
                    ad={user.ad}
                    soyad={user.soyad}
                    adress={user.adress}
                    salary={user.salary}
                  />
                );
              })}
            </div>
          );
        }
      }
      </UserConsumer>
    );
  }
}

export default Users;
