import React, { Component } from "react";
import axios from "axios";
import { Card, ListGroup } from "react-bootstrap";
import * as jwd_decode from "jwt-decode";
import Moment from "react-moment";
import { FaTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { GiCancel } from "react-icons/gi";
import { GrDocumentUpdate } from "react-icons/gr";
import { AiFillHeart } from "react-icons/ai";
import { FcDislike } from "react-icons/fc";
import CommentIcon from "@material-ui/icons/Comment";
import BackspaceIcon from "@material-ui/icons/Backspace";
import "./ArticlePage.css";

class ArticlePage extends Component {
  state = {
    article: "",
    pseudo: "",
    authorID: "",
    content_comment: "",
    newComment: "",
    isEditable: false,
    commentIdToEdit: "",
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    const decoded = jwd_decode(token);
    this.setState({ pseudo: decoded.pseudo, authorID: decoded.id });
    this.getArticle();
  }

  getArticle = () => {
    let token = localStorage.getItem("token");
    axios
      .get(
        `http://localhost:6800/articles/display_Article/${this.props.match.params.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => this.setState({ article: res.data }))
      .catch((err) => console.error(err));
  };

  handleChange = (e) => {
    this.setState({ content_comment: e.target.value });
  };
  addComment = (author, content_comment, authorID) => {
    let token = localStorage.getItem("token");
    axios
      .put(
        `http://localhost:6800/articles/${this.props.match.params.id}/add_comment`,
        {
          author,
          content_comment,
          authorID,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(
        this.setState({
          content_comment: "",
        })
      )
      .then((res) => this.getArticle())
      .catch((err) => console.error(err));
  };
  deleteComment = (id) => {
    let token = localStorage.getItem("token");
    axios
      .put(
        `http://localhost:6800/articles/${this.props.match.params.id}/delete_comment/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => this.getArticle())
      .catch((err) => console.log(err));
  };

  AddLike = () => {
    let token = localStorage.getItem("token");
    axios
      .put(
        `http://localhost:6800/articles/${this.props.match.params.id}/inclikes`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => this.getArticle())
      .catch((err) => console.error(err));
  };

  DisLike = () => {
    let token = localStorage.getItem("token");
    axios
      .put(
        `http://localhost:6800/articles/${this.props.match.params.id}/declikes`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => this.getArticle())
      .catch((err) => console.error(err));
  };

  handleChangeComment = (e) => {
    this.setState({
      newComment: e.target.value,
    });
  };
  handleUpdateComment = (author, content_comment, authorID, cmntId) => {
    let token = localStorage.getItem("token");
    axios
      .put(
        `http://localhost:6800/articles/${this.props.match.params.id}/edit_comment/${cmntId}`,
        { author, content_comment, authorID },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        this.getArticle();
        this.setState({ isEditable: !this.state.isEditable });
      })
      .catch((err) => console.log(err));
  };

  render() {
    const {
      title,
      image,
      content,
      comment,
      date,
      like,
      dislike,
      url,
      description,
    } = this.state.article;
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <BackspaceIcon
          onClick={() => window.location.replace("/home")}
          fontSize="large"
          style={{
            position: "fixed",
            left: "14%",
            cursor: "pointer",
          }}
        />
        <Card className="CommentCard">
          <Card.Img variant="top" style={{ height: "auto" }} src={image} />
          <Card.Body>
            <Card.Title className="p-title">{title}</Card.Title>
            <Card.Text>{description}</Card.Text>
            <Card.Text>
              {content}{" "}
              <a href={url} target="blanc">
                {" "}
                Continue Reading
              </a>
            </Card.Text>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <span style={{ cursor: "pointer" }}>
                {like}
                <AiFillHeart
                  style={{ fill: "red" }}
                  onClick={() => this.AddLike()}
                />
              </span>
              <span style={{ cursor: "pointer" }}>
                {dislike}
                <FcDislike
                  style={{ fill: "red" }}
                  onClick={() => this.DisLike()}
                />
              </span>
              <Moment
                format="YYYY-MM-DD HH:mm"
                style={{ fontWeight: "normal", fontSize: "14px" }}
              >
                {date}
              </Moment>
              <span>
                {typeof comment !== "undefined" ? comment.length : 0}
                <CommentIcon />
              </span>
            </div>
          </Card.Body>
          <ListGroup className="list-group-flush"></ListGroup>
          <Card.Body>
            {typeof comment != "undefined" &&
              comment.map((el) => (
                <div>
                  <div className="row">
                    <div className="col-8" key={el._id}>
                      <span style={{ fontWeight: "bold" }}>
                        {el.author}{" "}
                        <Moment
                          format="YYYY-MM-DD HH:mm"
                          style={{ fontWeight: "normal", fontSize: "14px" }}
                        >
                          {el.date_comment}
                        </Moment>
                      </span>

                      {this.state.isEditable &&
                      el._id === this.state.commentIdToEdit ? (
                        <div>
                          <input
                            type="text"
                            name="newComment"
                            value={this.state.newComment}
                            onChange={(e) => {
                              this.handleChangeComment(e);
                            }}
                          />
                          <GiCancel
                            onClick={() =>
                              this.setState({
                                isEditable: !this.state.isEditable,
                                newComment: el.content_comment,
                              })
                            }
                          />
                          <GrDocumentUpdate
                            onClick={() =>
                              this.handleUpdateComment(
                                this.state.pseudo,
                                this.state.newComment,
                                this.state.authorID,
                                this.state.commentIdToEdit
                              )
                            }
                          />
                        </div>
                      ) : (
                        <p>{el.content_comment}</p>
                      )}
                    </div>
                    {el.authorID === this.state.authorID && (
                      <div className="col-4">
                        <div className="row">
                          <FaTrashAlt
                            onClick={(e) => this.deleteComment(el._id)}
                            style={{ cursor: "pointer", fill: "red" }}
                          />
                        </div>
                        <br />
                        {!this.state.isEditable && (
                          <div className="row">
                            <FiEdit
                              onClick={() =>
                                this.setState({
                                  isEditable: !this.state.isEditable,
                                  commentIdToEdit: el._id,
                                  newComment: el.content_comment,
                                })
                              }
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <hr />
                </div>
              ))}
          </Card.Body>
          <Card.Body>
            <div className="comment-vote">
              <input
                className="comment-field "
                type="form-control"
                placeholder="Write your comment ..."
                value={this.state.content_comment}
                onChange={(e) => this.handleChange(e)}
              />
              <button
                className="btn btn-primary btn-comment"
                onClick={() => {
                  this.addComment(
                    this.state.pseudo,
                    this.state.content_comment,
                    this.state.authorID
                  );
                }}
              >
                comment
              </button>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default ArticlePage;
