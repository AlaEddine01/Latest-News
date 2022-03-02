import React, { Component } from "react";
import axios from "axios";
import { AiOutlineStop } from "react-icons/ai";
import { FcKey } from "react-icons/fc";
import "./UserList.css";

class UserList extends Component {
  state = {
    UserList: [],
  };

  componentDidMount() {
    this.displayUsers();
  }

  //unblock User

  UnblockUser = (id) => {
    axios
      .put(`/users/block_user/${id}`)
      .then((res) => this.displayUsers())
      .catch((err) => console.error(err));
  };

  //display User

  displayUsers = () => {
    let token = localStorage.getItem("token");
    axios
      .get("/users/display_Users", { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => this.setState({ UserList: response.data }))
      .catch((err) => console.error(err));
  };

  render() {
    return (
      <div>
        <div
          style={{
            position: "fixed",
            width: "100%",
            top: "0",
            display: "flex",
            justifyContent: "center",
            zIndex: "10000",
          }}
          className="bg-light"
        >
          <img
            style={{ position: "fixed", left: "14%" }}
            width="25"
            height="25"
            src="https://image.flaticon.com/icons/svg/892/892650.svg"
            className="loaded"
            onClick={() => window.location.replace("/home")}
            alt="homePage"
          />

          <h2 className="title_Users">User List</h2>
        </div>

        <table className="table table-striped" style={{ marginTop: "100px" }}>
          <thead>
            <tr>
              <th scope="col">
                Name{" "}
                <img
                  width="25"
                  height="25"
                  src="https://image.flaticon.com/icons/png/512/1828/1828492.png"
                  className="loaded"
                  alt="name"
                />
              </th>

              <th scope="col">
                Pseudonyme{" "}
                <img
                  width="25"
                  height="25"
                  src="https://image.flaticon.com/icons/png/512/2634/2634483.png"
                  className="loaded"
                  alt="Pseudonyme"
                />
              </th>

              <th scope="col">
                Email{" "}
                <img
                  width="25"
                  height="25"
                  src="https://image.flaticon.com/icons/svg/2991/2991144.svg"
                  className="loaded"
                  alt="Email"
                />
              </th>
              <th scope="col">
                Block{" "}
                <img
                  width="25"
                  height="25"
                  src="https://image.flaticon.com/icons/png/512/1810/1810742.png"
                  className="loaded"
                  alt="Block"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.UserList.map((user) => (
              <tr>
                <td>{user.name}</td>
                <td>{user.pseudo}</td>
                <td>{user.email}</td>
                {user.isBlocked ? (
                  <td>
                    <button
                      onClick={(event) => this.UnblockUser(user._id)}
                      className="btn btn-success"
                    >
                      <FcKey />
                    </button>
                  </td>
                ) : (
                  <td>
                    <button
                      onClick={(event) => this.UnblockUser(user._id)}
                      className="btn btn-danger"
                    >
                      <AiOutlineStop />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default UserList;
