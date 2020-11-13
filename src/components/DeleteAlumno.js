import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import $ from "jquery";

export default class DeleteAlumno extends Component {
  state = { status: false };
  //metodo que elimina un alumno de la Api
  deleteAlumno = () => {
    //url de la api
    var url = "http://localhost:3000/alumnos/" + this.props.idalumno;
    //variable interna del metodo
    var status = false;
    $.ajax({
      url: url,
      dataType: "json",
      cache: false,
      method: `DELETE`,
      success: function (data) {
        //si realiza correstamente la eliminacion entra aqui
        status = true;
      }.bind(this),
    }).then(() => {
      //lo que queremos que realice despues de realizar la eliminacion
      if (status == true) {
        this.setState({
          status: true,
        });
      }
    });
  };
  componentDidMount = () => {
    this.deleteAlumno();
  };
  render() {
    if (this.state.status == true) {
      return <Redirect to="/"></Redirect>;
    }
    return (
      <div className="text-center">
        <h1>Eliminar alumno</h1>
        {this.state.status == false && (
          <h3 style={{ color: "red" }}>
            Se ha producido un error en el delete de ajax
          </h3>
        )}
      </div>
    );
  }
}
