import React from 'react';
import "./Nav.css";
import logo from "./logos.png";

class Nav extends React.Component {
    state = {
  
    }
    render() {
      return (
        <div className="div">
          <nav className="navbar">
            <img alt="logo" className="logoprosis" src={logo} />
            <h1>PROSIS S.A. DE C.V. - MONITOREO DE LISTAS</h1>
          </nav>
          <div className='title'>
            <h4>Guatemala</h4>
          </div>
        </div>
      );
    }
  }
  export default Nav;
  