import React, { Component } from "react";
import { Redirect } from "react-router-dom";
//importacion de JQuery para uso en este componente
import $ from "jquery";

export default class PutAlumno extends Component {
  cajaNumeroRef = React.createRef();
  cajaNombreRef = React.createRef();
  cajaEmailRef = React.createRef();
  state = { alumno: {}, status: false, statusB: false };
  //metodo que realiza una modificacion del alumno seleccionado que esta en la api
  putAlumno = (e) => {
    e.preventDefault();
    //variables internas del metodo
    var alumno = {};
    var status = false;
    alumno.id = parseInt(this.props.idalumno);
    alumno.name = this.cajaNombreRef.current.value;
    alumno.email = this.cajaEmailRef.current.value;
    var alumnoJson = JSON.stringify(alumno);
    //url de la api
    var url = "http://localhost:3000/alumnos/" + this.props.idalumno;
    $.ajax({
      url: url,
      type: "PUT",
      data: alumnoJson,
      contentType: "application/json",
      success: function (data) {
        //si la modificacion es correcta entra aqui
        status = true;
      },
      error: function () {
        console.log("Error en ajax api PUT alumnos");
      },
    }).then(() => {
      //lo que queremos que realice despues de realizar la modificacion
      if (status == true) {
        this.setState({
          status: true,
        });
      }
    });
  };
  //metodo que realiza una llamada a la Api que nos trae un alumno especificico
  buscarAlumno = () => {
    //url de la api
    var url = "http://localhost:3000/alumnos/" + this.props.idalumno;
    //variables internas del metodo
    var alumno = {};
    var status = false;
    $.ajax({
      url: url,
      dataType: "json",
      cache: false,
      method: `GET`,
      success: function (data) {
        //si la llamada es correcta entra aqui
        status = true;
        alumno = data;
      }.bind(this),
    }).then(() => {
      //lo que queremos que realice despues de realizar la llamada
      if (status == true) {
        this.setState({
          statusB: true,
          alumno: alumno,
        });
      }
    });
  };
  componentDidMount = () => {
    this.buscarAlumno();
  };
  render() {
    if (this.state.status == true) {
      return <Redirect to="/"></Redirect>;
    }
    return (
      <div className="text-center">
        <h1>Modificar alumno</h1>
        {this.state.statusB == false && (
          <h3 style={{ color: "red" }}>
            Error en la carga del alumno: Ajax Api
          </h3>
        )}
        <form onSubmit={this.putAlumno}>
          <label>Número:</label>
          <input
            type="number"
            name="cajanumero"
            ref={this.cajaNumeroRef}
            defaultValue={this.props.idalumno}
            readOnly
          ></input>
          <label>Nombre:</label>
          <input
            type="text"
            name="cajanombre"
            ref={this.cajaNombreRef}
            defaultValue={this.state.alumno.name}
          ></input>
          <label>Email:</label>
          <input
            type="email"
            name="cajaemail"
            ref={this.cajaEmailRef}
            defaultValue={this.state.alumno.email}
          ></input>
          <button className="btn btn-success">Modificar</button>
        </form>
      </div>
    );
  }
}
