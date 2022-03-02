import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { FcAddImage } from "react-icons/fc";
import { RiArticleLine } from "react-icons/ri";
import { MdSubtitles } from "react-icons/md";
import { GrTree } from "react-icons/gr";
import { GrUpdate } from "react-icons/gr";
import { FaTrashAlt } from "react-icons/fa";
import "./UpdateArticle.css";

class UpdateArticle extends React.Component {
  state = {
    article: {},
  };

  componentDidMount() {
    this.getArticleById();
  }
  getArticleById = () => {
    let token = localStorage.getItem("token");
    axios
      .get(
        `http://localhost:6800/articles/display_Article/${this.props.match.params.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) =>
        this.setState({
          article: res.data,
        })
      )
      .catch((err) => console.error(err));
  };
  handleChange = (e) => {
    this.setState({
      article: { ...this.state.article, [e.target.name]: e.target.value },
    });
  };
  handleUpdate = (image, title, content, category) => {
    let token = localStorage.getItem("token");
    axios
      .put(
        `http://localhost:6800/articles/Update_Article/${this.props.match.params.id}`,

        {
          image,
          title,
          content,
          category,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => window.location.replace("/home"));
  };

  deleteComment = (id) => {
    let token = localStorage.getItem("token");
    axios
      .put(
        `http://localhost:6800/articles/${this.props.match.params.id}/delete_comment/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(this.getArticleById)
      .catch((err) => console.log(err));
  };

  render() {
    const { image, title, content, category, comment } = this.state.article;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div className="contact-info">
              <img
                width="210"
                height="210"
                src="https://image.flaticon.com/icons/png/512/2920/2920100.png"
                alt="edit"
              />
              <h2>Edit your Article !</h2>
            </div>
          </div>
          <div className="col-md-9">
            <div className="contact-form">
              <div className="form-group">
                <label className="control-label col-sm-6" htmlFor="fname">
                  New Title
                  <MdSubtitles />
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={title}
                    onChange={(e) => this.handleChange(e)}
                    placeholder="Enter title..."
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-sm-6" htmlFor="lname">
                  New Image <FcAddImage />
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Edit image..."
                    name="image"
                    value={image}
                    onChange={(e) => this.handleChange(e)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="control-label col-sm-6" htmlFor="lname">
                  New Category <GrTree />
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Edit category..."
                    name="category"
                    value={category}
                    onChange={(e) => this.handleChange(e)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label  col-sm-6" htmlFor="comment">
                  New Content <RiArticleLine />
                </label>
                <div className="col-sm-10">
                  <textarea
                    className="form-control"
                    placeholder="Edit Article..."
                    rows={5}
                    defaultValue={""}
                    name="content"
                    value={content}
                    onChange={(e) => this.handleChange(e)}
                  />
                </div>
              </div>
              <div className="form-group">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                  className="col-sm-offset-2 col-sm-10"
                >
                  <button
                    type="Button"
                    className="btn btn-default"
                    onClick={(e) =>
                      this.handleUpdate(image, title, content, category)
                    }
                  >
                    Update Article <GrUpdate />
                  </button>
                  <button
                    type="Button"
                    onClick={() => window.location.replace("/home")}
                    className="btn btn-danger"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*comment Table*/}
        <div className="comment-title">
          <h1>Comment List</h1>
        </div>

        <table className="table table-striped table-comment">
          <thead>
            <tr>
              <th scope="col">
                pseudo{" "}
                <img
                  width="25"
                  height="25"
                  src="https://image.flaticon.com/icons/png/512/2634/2634483.png"
                  className="loaded"
                  alt=""
                />
              </th>
              <th scope="col">
                comment{" "}
                <img
                  width="25"
                  height="25"
                  src="https://image.flaticon.com/icons/svg/2920/2920068.svg"
                  className="loaded"
                  alt=""
                />
              </th>
              <th scope="col">
                remove{" "}
                <img
                  width="25"
                  height="25"
                  src="https://image.flaticon.com/icons/png/512/2892/2892857.png"
                  className="loaded"
                  alt=""
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {typeof comment != "undefined" &&
              comment.map((el) => (
                <tr>
                  <td>{el.author}</td>
                  <td>{el.content_comment}</td>
                  <td>
                    <FaTrashAlt
                      onClick={(e) => this.deleteComment(el._id)}
                      style={{ cursor: "pointer", fill: "red" }}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default withRouter(UpdateArticle);
