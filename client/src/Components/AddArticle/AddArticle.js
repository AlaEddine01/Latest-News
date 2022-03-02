import React, { useState } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { FcAddImage } from "react-icons/fc";
import { RiArticleLine } from "react-icons/ri";
import { MdSubtitles } from "react-icons/md";
import { GrDuplicate } from "react-icons/gr";
import { GrTree } from "react-icons/gr";
import "./AddArticle.css";

function AddArticle(props) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  const addArticle = () => {
    let token = localStorage.getItem("token");
    axios
      .post(
        "/articles/Add_Article",
        { headers: { Authorization: `Bearer ${token}` } },
        { title, image, content, category }
      )
      .then((response) => {
        if (response.status === 200) {
          alert("Article Added");
          setTitle("");
          setImage("");
          setCategory("");
          setContent("");
          props.history.push("/home");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container ">
      <div className="row">
        <div
          className="col-md-3 "
          style={{ backgroundColor: "rgb(24, 32, 75)" }}
        >
          <div className="contact-info">
            <img
              width="224"
              height="224"
              style={{ marginLeft: "-21px" }}
              src="https://image.flaticon.com/icons/png/512/2571/2571130.png"
              className="loaded"
              alt="newsLogo"
            />
            <h2>Add your New Article !</h2>
          </div>
        </div>
        <div className="col-md-9">
          <div className="contact-form">
            <div className="form-group">
              <label className="control-label col-sm-6" htmlFor="fname">
                Article Title
                <MdSubtitles />
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-6" htmlFor="lname">
                Image Article
                <FcAddImage />
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="Enter your source image..."
                />
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-6" htmlFor="lname">
                Article category <GrTree />
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your category..."
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="control-label  col-sm-6" htmlFor="comment">
                Content Article <RiArticleLine />
              </label>
              <div className="col-sm-10">
                <textarea
                  className="form-control"
                  placeholder="Enter your Article..."
                  rows={5}
                  defaultValue={""}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <div
                style={{ display: "flex", justifyContent: "space-between" }}
                className="col-sm-offset-2 col-sm-10 "
              >
                <button
                  type="Button"
                  style={{ backgroundColor: "rgb(24, 32, 75)" }}
                  onClick={() => addArticle()}
                  className="btn btn-default"
                >
                  Add Article <GrDuplicate />
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
    </div>
  );
}

export default withRouter(AddArticle);
