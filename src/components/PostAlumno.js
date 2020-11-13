import React, { Component } from "react";
import { Redirect } from "react-router-dom";
//importacion de JQuery para uso en este componente
import $ from "jquery";

export default class PostAlumno extends Component {
  cajaNumeroRef = React.createRef();
  cajaNombreRef = React.createRef();
  cajaEmailRef = React.createRef();

  state = { status: false };
  //metodo que realiza una insercion de un alumno a la api
  postAlumno = (e) => {
    e.preventDefault();
    //variables internas del metodo
    var alumno = {};
    var status = false;
    alumno.idalumno = parseInt(this.cajaNumeroRef.current.value);
    alumno.name = this.cajaNombreRef.current.value;
    alumno.email = this.cajaEmailRef.current.value;
    var alumnoJson = JSON.stringify(alumno);
    //url de la api
    var url = "http://localhost:3000/alumnos/";
    $.ajax({
      url: url,
      type: "POST",
      data: alumnoJson,
      contentType: "application/json",
      success: function (data) {
        //si la insercion es correcta entra aqui
        status = true;
      },
      error: function () {
        console.log("Error en ajax api POST alumnos");
      },
    }).then(() => {
      //lo que queremos que realice despues de realizar la insercion
      if (status == true) {
        this.setState({
          status: true,
        });
      }
    });
  };
  render() {
    if (this.state.status == true) {
      return <Redirect to="/"></Redirect>;
    }
    return (
      <div className="text-center">
        <h1>Nuevo alumno</h1>
        <form onSubmit={this.postAlumno}>
          <label>Id:</label>
          <input
            type="number"
            name="cajanumero"
            ref={this.cajaNumeroRef}
          ></input>
          <label>Nombre:</label>
          <input type="text" name="cajanombre" ref={this.cajaNombreRef}></input>
          <label>Email:</label>
          <input type="email" name="cajaemail" ref={this.cajaEmailRef}></input>
          <button className="btn btn-success">Insertar</button>
        </form>
      </div>
    );
  }
}
