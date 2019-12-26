import React, { Fragment } from 'react';

class ConteoTag extends React.Component{
    constructor(){
        super();

        this.state={
            guatemala: [],
            reload: true,
            error: false
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
        fetch('https://localhost:44328/api/Tag')
        .then(res => res.json())
        .then(data => this.setState({
          guatemala: data,
          reload: false
        }))
        .catch(error => {
            console.log(error);
            this.setState({ reaload: false, error: true });
          });
          this.timerID = setInterval(() => this.tick(), 90000); 
    }

    tick() {
        fetch('https://localhost:44328/api/Tag')
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

    render() {
      return(
        <Fragment>
          {this.error()}
          {this.state.guatemala.map((guate, id) => { 
            if(guate.data !== "Sin Conexion Pc"){
              if(guate.data !== "Sin Conexion Sql"){
                return(
                  <td key={id}>
                  <p>{guate.data.queryCount}</p>
                  </td>
                );
              }
              else{
                return(
                  <div className='card list1 bg-orange'>
                    <p>{guate.data.queryCount}</p>
                  </div>
                );
              }
            }
            else{
              return(
                <div className='card list1 bg-red'>
                  <p>{guate.data.queryCount}</p>
                </div>
              );
            }
          })} 
        </Fragment>
    );
  }
}

export default ConteoTag;