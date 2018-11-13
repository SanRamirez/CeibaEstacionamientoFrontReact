import React, { Component } from 'react';
import ApiEstacionamientoCeiba from '../../services/ApiEstacionamientoCeiba';
class ListaVehiculos extends React.Component {

    constructor(props) {
      super(props)
       this.state = {
          //vehiculos: this.props.vehiculos
        }
    }
  
    componentDidMount() {
      /*
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
      */  
    }
  
    render() {
      console.log(this.props.vehiculos);
      if (this.props.vehiculos == "" || typeof this.props.vehiculos === 'undefined') {
  
      return (
          <p>No se tienen vehiculos parqueados</p>
      )
  
      } else {

          let Items = this.props.vehiculos.map((Item, i) =>
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
