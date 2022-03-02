import React from "react";
import { Route, Switch } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import AboutUs from "./Components/AboutUs/AboutUs";
import SignIn from "./Components/SignIn/SignIn";
import SignUp from "./Components/SignUp/SignUp";
import HomePage from "./Components/HomePage/HomePage";
import AddArticle from "./Components/AddArticle/AddArticle";
import ArticlePage from "./Components/ArticlePage/ArticlePage";
import UpdateArticle from "./Components/UpdateArticle/UpdateArticle";
import FetchedArticles from "./Components/FetchedArticles/FetchedArticles";
import UserList from "./Components/UserList/UserList";
// import Spinner from "./Components/Spinner/Spinner"
import "./App.css";

function App() {
  return (
    <div className="page-container">
      <div className="content-wrap">
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route exact path="/SignUp" component={SignUp} />
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/add_article" component={AddArticle} />
          <Route
            exact
            path={"/articles/display_Article/:id"}
            component={ArticlePage}
          />
          <Route exact path={"/edit/:id"} component={UpdateArticle} />
          <Route exact path="/UserList" component={UserList} />
          <Route exact path={"/autofetch"} component={FetchedArticles} />
          <Route exact path={"/about-us"} component={AboutUs} />
        </Switch>
        <Footer />
        {/* <Spinner/> */}
      </div>
    </div>
  );
}

export default App;
