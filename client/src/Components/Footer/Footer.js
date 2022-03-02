import React from "react";
import { Navbar } from "react-bootstrap";

function Footter() {
  return (
    <Navbar bg="light" variant="light" sticky="bottom">
      <Navbar.Collapse className="justify-content-center">
        <Navbar.Text
          style={{
            fontSize: "0.75rem",
            textAlign: "center",
            margin: "40px 0px",
          }}
        >
          This site uses cookies to deliver services in accordance with this
          Privacy Policy. You can specify the conditions for storing or
          accessing cookies on your browser.
          <br />© 2020 3A Company Inc.
          <br />
          <a
            href="/about-us"
            style={{
              fontWeight: "bold",
              fontSize: "20px",
              color: "cornflowerblue",
            }}
          >
            About-Us
          </a>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Footter;
