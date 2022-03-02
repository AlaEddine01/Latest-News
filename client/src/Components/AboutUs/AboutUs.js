import React, { Component } from "react";
import siteLogo from "../Navbar/siteLogo.jpg";
import "./AboutUs.css";

class AboutUs extends Component {
  render() {
    return (
      <div className="About-us">
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
            src="https://image.flaticon.com/icons/svg/526/526917.svg"
            className="loaded"
            alt=""
          />
          <h2 style={{ color: "#008B8B" }} className="abus">
            About - US{" "}
          </h2>
        </div>
        <div className={"paragraph"}>
          <p>
            welcome to our newspapers, our site is created to announce the latest news from
            around the world, we cover the latest news from different categories: sport,
            health, politics, movies ... now don't miss any news{" "}
            <img
              width="20"
              height="20"
              src="https://image.flaticon.com/icons/svg/633/633866.svg"
              className="loaded"
              alt=""
            />
          </p>
        </div>

        <div className="cercle">
          <img
            className="rounded-circle z-depth-2 cercle-img"
            alt="100x100"
            src={siteLogo}
            data-holder-rendered="true"
          />
        </div>
      </div>
    );
  }
}

export default AboutUs;
