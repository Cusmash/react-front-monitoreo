import React, { Fragment } from 'react';

class LSTBNT extends React.Component{
    constructor(){
        super();

        this.state={
            lstbntName: [],
            lstbntTime: [],
            lstbntSize: [],
            lstbntStatus: [],
            lstbntTags: [],
            lstbntExtension: []
        };
    }


    componentDidMount(){
            //fetch('http://pc004.sytes.net:185/api/values')
            fetch('https://localhost:44328/api/LSTBINT')
            .then(res => res.json())
            .then(data => this.setState({
                lstbntName: data[0][0],
                lstbntTime: data[0][1],
                lstbntSize: data[0][2],
                lstbntStatus: data[0][3],
                lstbntTags: data[0][4],
                lstbntExtension: data[0][5]
            }))
            .catch(error => {
                console.log(error);
                this.setState({ cargreloada: false, error: true });
              });
              this.timerID = setInterval(() => this.tick(), 90000);
    }

    tick() {
        fetch('https://localhost:44328/api/LSTBINT')
        .then(res => res.json())
        .then(data => 
          this.setState({
            lstbntName: data[0][0],
            lstbntTime: data[0][1],
            lstbntSize: data[0][2],
            lstbntStatus: data[0][3],
            lstbntTags: data[0][4],
            lstbntExtension: data[0][5]
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
                <td className={this.setColor(this.state.lstbntStatus)}>
                    <p>{this.state.lstbntName}</p>
                    <p>{this.state.lstbntTime}</p>
                </td>
                <td className={this.setColor(this.state.lstbntStatus)}>
                    <p>{this.state.lstbntSize}</p>
                    <p>No. Lineas: <br/>{this.state.lstbntTags}</p>
                </td>
            </Fragment>
        );
    }
}

export default LSTBNT;