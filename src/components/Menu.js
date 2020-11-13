import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class Menu extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-primary">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <NavLink className="navbar-brand" to="/">
            <img
              src="data:image/png;base64,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"
              style={{ maxHeight: "50px" }}
            />
          </NavLink>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item active">
                <NavLink className="nav-link" to="/">
                  Home <span className="sr-only">(current)</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/create">
                  Nuevo Alumno
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
