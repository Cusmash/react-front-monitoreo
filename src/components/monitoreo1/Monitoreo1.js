import React from 'react';

//Componentes que hacen fetch
import OperacionCajero from '../Fetch/OperacionCajero/OperacionCajero';
import ConteoTag from '../Fetch/ConteoTag/ConteoTag';
import LSTBNT from '../Fetch/LSTBNT/LSTBNT';

//import Loader from "../../Loader/Loader";
import Loader from '../Loader/Loader';
import './Monitoreo1.styles.css';


class Monitoreo1 extends React.Component {
  constructor(){
    super();

    this.state = {
      guatemala: [],
      reload: true,
      error: false,
      color: ""
    };
  }

  load() {
    if (this.state.reload === true) {
      return (
        <tr>
          <td colSpan="6">
            <Loader />
          </td>
        </tr>
      );
    }
  }

  error() {
    if (this.state.error === true) {
      return (
        <tr>
          <td colSpan="6">
            <p className="text-center">
              Algo fallo con la conexion
            </p>
          </td>
        </tr>
      );
    }
  }

  componentDidMount(){
      fetch('https://localhost:44328/api/Historico')
      .then(res => res.json())
      .then(data3 => 
        this.setState({
          guatemala: data3,
          reload: false
      }))
      .catch(error => {
        console.log(error);
        this.setState({ reaload: false, error: true });
      });
      this.timerID = setInterval(() => this.timer(), 90000); 
  }

  /* el timerID en componentDidMount ejecuta tick */
  timer() {
    fetch('https://localhost:44328/api/Historico')
    .then(res => res.json())
    .then(data3 => 
      this.setState({
        guatemala: data3,
        reload: false
    }))
    .catch(error => {
      console.log(error);
      this.setState({ reload: false });
    });
  }

  setColor(status) {
    switch (status) {
      case true:
        return "amarillo"
      case false:
        return ""
      default:
        return ""
    }
  }

  render() {
    return (
      <table className="container">
      <thead>
        <tr>
          <th>Plaza</th>
          <th>Ultimo Cruce</th>
          <th>Ultima Operacion</th>
          <th>Tags SQL</th>
          <th>Nombre y Fecha</th>
          <th>Tamaño y Tags</th>
        </tr>
      </thead>
      <tbody>
        {this.load()}
        {this.error()}
        {this.state.guatemala.map((guate, id) => { 
          if(guate.data !== "Sin Conexion Pc"){
            if(guate.data !== "Sin Conexion Sql"){
              return (
                <tr key={id}>
                  <td className='card plaza'>
                    <h3>
                      Autopista Palin-Escuintla
                    </h3>
                  </td>
                  <td className={this.setColor(guate.data.consultaSql[3])}>
                    <p>Evento: <br/>{guate.data.consultaSql[2]}</p>
                    <p>Fecha: <br/>{guate.data.consultaSql[1]}</p>
                   </td>
                   <OperacionCajero ></OperacionCajero>
                   <ConteoTag></ConteoTag>
                   <LSTBNT></LSTBNT>
                </tr>
              );
            }
            else{
              return(
                <tr>
                  <td className='card plaza'>
                    <h3>
                      Autopista Palin-Escuintla
                    </h3>
                  </td>
                  <td className='card list1 bg-orange'>
                    <p>Evento: <br/>{guate.data}</p>
                    <p>Fecha: <br/>{guate.data}</p>
                  </td>
                <OperacionCajero></OperacionCajero>
                <ConteoTag></ConteoTag>
                <LSTBNT></LSTBNT>
                </tr>
              );
            }
          }
          else{
              return(
                <tr>
                  <td className='card plaza'>
                    <h3>
                      Autopista Palin-Escuintla
                    </h3>
                  </td>
                  <td className='card list1 bg-red'>
                    <p>Evento: <br/>{guate.data}</p>
                    <p>Fecha: <br/>{guate.data}</p>
                  </td>
                <OperacionCajero></OperacionCajero>
                <ConteoTag></ConteoTag>
                <LSTBNT></LSTBNT>
                </tr>
              );
            }
        })}
      </tbody>
      </table>
    );
  }
}

export default Monitoreo1;
