import React, { Fragment } from 'react';

class OperacionCajero extends React.Component{
  constructor(){
      super();
      this.state={
          guatemala: [],
          reload: true
      };
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
      fetch('https://localhost:44328/api/Cajero')
      .then(res => res.json())
      .then(data => this.setState({
          guatemala: data,
          reload: false
      }))
      .catch(error => {
          console.log(error);
          this.setState({ cargreloada: false, error: true });
        });
        this.timerID = setInterval(() => this.tick(), 90000);
  }
    tick() {
      fetch('https://localhost:44328/api/Cajero')
      .then(res => res.json())
      .then(data => 
        this.setState({
          guatemala: data,
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
    return(
      <Fragment>
        {this.error()}
        {this.state.guatemala.map((guate, id) => { 
          if(guate.data !== "Sin Conexion Pc"){
            if(guate.data !== "Sin Conexion Sql"){
              return(
                <td key={id} className={this.setColor(guate.data.consultaSql[3])}>
                  <p>Concepto: <br/>{guate.data.consultaSql[0]}</p>
                  <p>Fecha: <br/>{guate.data.consultaSql[1]}</p>
                </td>
              );
            }
            else{
              return(
                <td key={id} className='card list1 bg-orange'>
                  <p>Concepto: <br/>{guate.data.consultaSql[0]}</p>
                  <p>Fecha: <br/>{guate.data.consultaSql[1]}</p>
                </td>
              );
            }
          }
          else{
            return(
              <td key={id} className='card list1 bg-red'>
                <p>Concepto: <br/>{guate.data.consultaSql[0]}</p>
                <p>Fecha: <br/>{guate.data.consultaSql[1]}</p>
              </td>
            );
          }
        })} 
      </Fragment>
    );
  }
}

export default OperacionCajero;