import React, { Component } from "react";
import { NavLink } from "react-router-dom";
//importacion de JQuery para uso en este componente
import $ from "jquery";
export default class Alumnos extends Component {
  state = {
    alumnos: [],
    status: false,
  };
  //metodo que realiza un Get a la api y nos trae los alumnos que hay en ella
  mostraralumnos = () => {
    //url de la api
    var url = "http://localhost:3000/alumnos/";
    //variables internas del metodo
    var status = false;
    var alumnos = [];
    //llamada a la api mediante Ajax JQuery
    $.ajax({
      url: url,
      dataType: "json",
      cache: false,
      method: `GET`,
      success: function (data) {
        //si la llamada es correcta entra aqui
        alumnos = data;
        status = true;
      }.bind(this),
    }).then(() => {
      //lo que queremos que realice despues de realizar la llamada
      if (status == true) {
        this.setState({
          status: true,
          alumnos: alumnos,
        });
      }
    });
  };

  componentDidMount = () => {
    this.mostraralumnos();
  };
  render() {
    return (
      <div className="text-center">
        <h1>Listado de alumnos</h1>
        {this.state.alumnos.length > 0 && (
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Modificar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {this.state.alumnos.map((alumno, index) => {
                return (
                  <tr key={index}>
                    <td>{alumno.id}</td>
                    <td>{alumno.name}</td>
                    <td>{alumno.email}</td>
                    <td>
                      <NavLink
                        to={"/update/" + alumno.id}
                        className="btn btn-primary"
                      >
                        Modificar
                      </NavLink>
                    </td>
                    <td>
                      <NavLink
                        to={"/delete/" + alumno.id}
                        className="btn btn-danger"
                      >
                        Eliminar
                      </NavLink>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {this.state.alumnos.length == 0 && (
          <h3 style={{ color: "red" }}>No hay alumnos</h3>
        )}
        {this.state.status == false && (
          <h3 style={{ color: "red" }}>
            Se ha producido un error en el servicio ajax GET
          </h3>
        )}
      </div>
    );
  }
}
