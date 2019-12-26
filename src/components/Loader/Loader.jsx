import React from "react";
import "./Loader.css"
class Loader extends React.Component {
  render() {
    return (
      <div className="text-center width-loader">
        <div className="spinner-border loader">
          <span className="sr-only">Loading...</span>
        </div>
        <p className="color-azul">Cargando...</p>
      </div>
    );
  }
}
export default Loader;
