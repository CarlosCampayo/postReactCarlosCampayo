import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Alumnos from "./Alumnos";
import DeleteAlumno from "./DeleteAlumno";
import Menu from "./Menu";
import PostAlumno from "./PostAlumno";
import PutAlumno from "./PutAlumno";

export default class Router extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Menu></Menu>
          <Switch>
            <Route exact path="/" component={Alumnos}></Route>
            <Route exact path="/create" component={PostAlumno}></Route>
            <Route
              exact
              path="/update/:id"
              render={(props) => {
                console.log(props.match.params.id);
                return <PutAlumno idalumno={props.match.params.id}></PutAlumno>;
              }}
            ></Route>
            <Route
              exact
              path={"/delete/:id"}
              render={(props) => {
                return (
                  <DeleteAlumno idalumno={props.match.params.id}></DeleteAlumno>
                );
              }}
            ></Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
