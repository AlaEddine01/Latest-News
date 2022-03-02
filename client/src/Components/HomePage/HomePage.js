import React, { Component } from "react";
import axios from "axios";
import * as jwd_decode from "jwt-decode";
import { Link } from "react-router-dom";
import NavBar from "../Navbar/Navbar";
import Moment from "react-moment";
import Spinner from "../Spinner/Spinner";
import CommentIcon from "@material-ui/icons/Comment";
import "./HomePage.css";
import { AiFillHeart } from "react-icons/ai";

export default class HomePage extends Component {
  state = {
    ArticlesList: [],
    name: "",
    role: "",
    isBlocked: false,
    filteredTitle: "",
    filteredCategory: "",
    filteredLikes: false,
    loading: false,
  };

  componentDidMount() {
    if (!localStorage.token) {
      this.props.history.push("/");
    } else {
      const token = localStorage.getItem("token");
      const decoded = jwd_decode(token);
      this.setState({ name: decoded.name });
      this.setState({ role: decoded.role });
      this.setState({ isBlocked: decoded.isBlocked });
    }
    this.getArticlesList();
    this.getUserList();
  }

  /* request for getting all article */
  getArticlesList = () => {
    let token = localStorage.getItem("token");
    this.setState({ loading: true });
    axios
      .get("/articles/display_Article", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => this.setState({ ArticlesList: res.data, loading: false }))
      .catch((err) => console.error(err));
  };

  /* request for delete article */
  DeleteArticle = (_id) => {
    let token = localStorage.getItem("token");
    axios
      .delete(`/articles/Delete_Article/${_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(this.getArticlesList());
  };

  /* request for getting all users */
  getUserList = () => {
    let token = localStorage.getItem("token");
    axios
      .get("/users/display_Users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => this.setState({ UserList: res.data }))
      .catch((err) => console.error(err));
  };

  //  Logout Function
  Logout = () => {
    localStorage.clear();
    window.location.replace("/");
  };

  // Call Back Function for Name Filter
  handleSearchName = (input) => {
    this.setState({ filteredTitle: input });
  };

  //  Call Back Function for Category Filter
  handleSearchCategory = (input) => {
    this.setState({ filteredCategory: input });
  };

  //  Call Back Function For Likes Filter
  handleLikesFilter = () => {
    if (this.state.filteredLikes) {
      this.setState({ filteredLikes: !this.state.filteredLikes });
      this.getArticlesList();
    } else {
      let token = localStorage.getItem("token");
      axios
        .get("/articles/mostliked", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          this.setState({
            ArticlesList: res.data,
            filteredLikes: !this.state.filteredLikes,
          });
        });
    }
  };

  render() {
    let filteredArticles = [];
    filteredArticles = this.state.ArticlesList.filter(
      (article) =>
        article.title
          .toUpperCase()
          .includes(this.state.filteredTitle.toUpperCase()) &&
        article.category
          .toUpperCase()
          .includes(this.state.filteredCategory.toUpperCase())
    );
    return (
      <div>
        <NavBar
          searchName={this.handleSearchName}
          searchCategory={this.handleSearchCategory}
          LikesFilter={this.handleLikesFilter}
          Logout={this.Logout}
        />

        <div className="container list">
          <Spinner loading={this.state.loading} />
          {filteredArticles.map((article, index) => (
            <div key={article._id}>
              <Link
                to={`/articles/display_Article/${article._id}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="card article"
                  key={article._id}
                  style={{ width: "18rem", marginTop: "20px", height: "600px" }}
                >
                  <div>
                    <img
                      src={article.image}
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body" style={{ padding: 0 }}>
                      <p className="card-title p-title">{article.title}</p>
                      {
                        <p className="card-text p-content">
                          {article.content.slice(0, 100)}...
                        </p>
                      }
                    </div>
                  </div>
                  <div className="likeReaction">
                    {/* likes and comments numbers */}
                    <span>
                      {/* <img
                        width="20"
                        height="20"
                        src="https://image.flaticon.com/icons/svg/889/889140.svg"
                        className="loaded"
                        alt="like"
                      /> */}
                      <AiFillHeart style={{ fill: "red" }} />
                      &nbsp;
                      {article.like}
                    </span>
                    <Moment
                      format="YYYY-MM-DD HH:mm"
                      style={{ fontWeight: "normal", fontSize: "14px" }}
                    >
                      {article.date}
                    </Moment>
                    <span>
                      {article.comment.length}
                      &nbsp;
                      <CommentIcon />
                    </span>
                  </div>
                </div>
              </Link>
              <div>
                {/* verify if token have admin role or user */}
                {this.state.role === "admin" ? (
                  <div className="card-footer">
                    <Link to={`/edit/${article._id}`}>
                      <button className="btn btn-primary">Edit</button>
                    </Link>

                    <button
                      className="btn btn-danger"
                      onClick={() => this.DeleteArticle(article._id)}
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
