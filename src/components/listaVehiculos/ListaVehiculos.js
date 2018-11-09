import React, { Component } from 'react';
import ApiEstacionamientoCeiba from '../../services/ApiEstacionamientoCeiba';
class ListaVehiculos extends React.Component {

    constructor() {
      super()
       this.state = {
          vehiculos: []
        }
    }
  
    componentDidMount() {
      ApiEstacionamientoCeiba.consultarVehiculos()
        .then(res => {
          let vehiculos = res;
          console.log(vehiculos);
          if (typeof res !== 'undefined') {
            this.setState({
              vehiculos:vehiculos
            });
          } else {
            this.setState({
              vehiculos: null
            });
          }
        });
    }
  
    render() {
      if (this.state.vehiculos == "") {
  
      return (
          <p>No se tienen vehiculos parqueados</p>
      )
  
      } else {

          let Items = this.state.vehiculos((Item, i) =>
            <tr key={i}>
              <td>{Item.placa}</td>
            </tr>
            );
  
           return <table className='table table-striped'>
                   <thead>
                      <tr>
                        <th>Placa</th>
                      </tr>
                    </thead>
                   <tbody>
                      {Items}
                    </tbody>
                   </table>
      }
    }
  }
  
  export default ListaVehiculos
