import React, { Component } from "react";
import axios from "axios";
import Spinner from "../Spinner/Spinner";
import { Alert } from "react-bootstrap";

export default class FetchedArticles extends Component {
  state = {
    newArticles: [],
    category: "test",
    loading: false,
    added: false,
  };
  componentDidMount() {
    let token = localStorage.getItem("token");
    this.setState({ loading: true });
    axios
      .get(
        "http://newsapi.org/v2/top-headlines?country=us&apiKey=609859951f9844b3a6c61304442c73c2",
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) =>
        this.setState({ newArticles: res.data.articles, loading: false })
      )
      .catch((err) => console.log(err));
    // .then((res) => console.log(this.state.newArticles));
  }

  addArticle = (article) => {
    const newArticle = {
      title: article.title,
      image: article.urlToImage,
      content: article.content === null ? "_" : article.content,
      description: article.description,
      // category: article.category,
      category: this.state.category,
      url: article.url,
      date: article.publishedAt,
    };
    let token = localStorage.getItem("token");
    axios
      .post("/articles/Add_Article", newArticle, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.status === 200) {
          alert("product added successfuly");
        }
      })
      .catch((err) => console.error(err));
  };

  addAll = (newArticles) => {
    let token = localStorage.getItem("token");
    for (let index = 0; index < newArticles.length; index++) {
      const newArticle = {
        title: newArticles[index].title,
        image: newArticles[index].urlToImage,
        content: newArticles[index].content,
        description: newArticles[index].description,
        // category: article.category,
        category: this.state.category,
        url: newArticles[index].url,
        date: newArticles[index].publishedAt,
      };
      axios
        .post("/articles/Add_Article", newArticle, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .catch((err) => console.error(err));
    }
    this.setState({ added: true });
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
            style={{ marginRight: "2%", cursor: "pointer" }}
            onClick={() => window.location.replace("/home")}
            width="40"
            height="40"
            src="https://image.flaticon.com/icons/png/512/2948/2948210.png"
            className="loaded"
            alt=""
          />
          <h2 style={{ color: "#008B8B" }}>
            Data fetched from news API{" "}
            {/* <img
              width="60"
              height="60"
              src="https://image.flaticon.com/icons/png/512/2996/2996310.png"
              className="loaded"
              alt=""
            />{" "} */}
            <button
              onClick={() => this.addAll(this.state.newArticles)}
              disabled={this.state.loading}
            >
              Add All
            </button>
          </h2>
        </div>

        <div>
          <div className="container list">
            <Spinner loading={this.state.loading} />
            {this.state.added === true ? (
              <Alert variant="success">All product Added successfuly</Alert>
            ) : (
              this.state.newArticles.map((article, index) => (
                <div key={index}>
                  <div
                    className="card article"
                    style={{
                      width: "18rem",
                      marginTop: "20px",
                      height: "600px",
                    }}
                  >
                    <div>
                      <img
                        src={article.urlToImage}
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body" style={{ padding: 0 }}>
                        <p className="card-title p-title">{article.title}</p>
                        {
                          <p className="card-text p-content">
                            {article.content}...
                          </p>
                        }
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="card-footer">
                      <button
                        className="btn btn-success"
                        onClick={() => this.addArticle(article)}
                      >
                        Add Article
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }
}
