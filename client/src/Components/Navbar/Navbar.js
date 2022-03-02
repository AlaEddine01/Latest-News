import React, { Component } from "react";
import { GiAmericanFootballBall } from "react-icons/gi";
import { GiHeartBeats } from "react-icons/gi";
import { FcFilmReel } from "react-icons/fc";
import { AiFillBank } from "react-icons/ai";
import { GiEarthAfricaEurope } from "react-icons/gi";
import SettingsIcon from "@material-ui/icons/Settings";
import PeopleIcon from "@material-ui/icons/People";
import PostAddIcon from "@material-ui/icons/PostAdd";
import GetAppIcon from "@material-ui/icons/GetApp";
import FilterListIcon from "@material-ui/icons/FilterList";
import logoo from "./siteLogo.jpg";
import * as jwd_decode from "jwt-decode";
import { withRouter } from "react-router-dom";

class NavBar extends Component {
  state = {
    role: "",
  };

  componentDidMount() {
    if (!localStorage.token) {
      this.props.history.push("/");
    } else {
      const token = localStorage.getItem("token");
      const decoded = jwd_decode(token);
      this.setState({ role: decoded.role });
    }
  }

  render() {
    return (
      <div>
        <nav
          className="navbar navbar-expand-sm navbar-light bg-light"
          style={{ position: "fixed", top: 0, width: "100%", zIndex: "1" }}
        >
          <a className="navbar-brand" href="/home">
            <img
              src={logoo}
              alt="Logo"
              style={{ borderRadius: "50%", width: "70px" }}
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item dropdown">
                <a className="nav-link" href="/home">
                  <img
                    width="20"
                    height="20"
                    src="https://image.flaticon.com/icons/png/512/2948/2948210.png"
                    className="loaded"
                    alt="home"
                  />
                </a>
              </li>
              {this.state.role === "admin" && (
                <li className="nav-item dropdown">
                  <div
                    className="nav-link dropdown-toggle"
                    // href="#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <SettingsIcon />
                  </div>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <a className="dropdown-item" href="/UserList">
                      <PeopleIcon /> User list
                    </a>
                    <a className="dropdown-item" href="Add_Article">
                      <PostAddIcon /> Add Article
                    </a>
                    <a className="dropdown-item" href="autofetch">
                      <GetAppIcon /> Auto Fetch
                    </a>
                  </div>
                </li>
              )}
            </ul>
            <input
              className="form-control"
              onChange={(e) => this.props.searchName(e.target.value)}
              placeholder="Search..."
            />
            <ul className="navbar-nav mr-auto">
              <li className="nav-item dropdown">
                <div
                  className="nav-link dropdown-toggle"
                  // href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <FilterListIcon />
                </div>
                <div
                  className="dropdown-menu dropdown-menu-right"
                  aria-labelledby="navbarDropdown"
                >
                  <div
                    className="dropdown-item"
                    onClick={(e) => this.props.searchCategory(e.target.name)}
                  >
                    <GiEarthAfricaEurope /> All
                  </div>
                  <a
                    className="dropdown-item"
                    href="#national"
                    name="National"
                    onClick={(e) => this.props.searchCategory(e.target.name)}
                  >
                    <AiFillBank /> National
                  </a>
                  <a
                    className="dropdown-item"
                    href="#sports_news"
                    name="Sport"
                    onClick={(e) => this.props.searchCategory(e.target.name)}
                  >
                    <GiAmericanFootballBall /> Sport
                  </a>
                  <a
                    className="dropdown-item"
                    href="#health_news"
                    name="health"
                    onClick={(e) => this.props.searchCategory(e.target.name)}
                  >
                    <GiHeartBeats /> Health
                  </a>
                  <a
                    className="dropdown-item"
                    href="#films_news"
                    name="film"
                    onClick={(e) => this.props.searchCategory(e.target.name)}
                  >
                    <FcFilmReel /> Film
                  </a>

                  <div className="dropdown-divider"></div>
                  <div
                    className="custom-control custom-checkbox"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="like"
                      onClick={(e) => this.props.LikesFilter()}
                    />{" "}
                    <label className="custom-control-label" htmlFor="like">
                      Most Liked{" "}
                    </label>{" "}
                  </div>
                </div>
              </li>
              <li className="nav-item " style={{ marginLeft: "20px" }}>
                <button
                  className=" btn btn-danger "
                  onClick={() => this.props.Logout()}
                >
                  LogOut
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
export default withRouter(NavBar);
