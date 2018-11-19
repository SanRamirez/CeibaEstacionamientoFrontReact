import React, { Component } from 'react';
import logoCeiba from './logoCeibaSoftware.png';
import './App.css';
import ApiEstacionamientoCeiba from './services/ApiEstacionamientoCeiba';
//import ListaNotas from './components/listaVehiculos/ListaVehiculos.js';
import {Button, Icon,Footer,Input,Tabs, Tab} from 'react-materialize';
import Swal from 'sweetalert2'


class App extends Component {

  constructor(){
    super()
    this.state = {
      placa: "",
      cilindraje: "",
      tipo: 1,
      precioDolar: "",
      placaRetiro: "",
      vehiculos: [],
      data:"",
      data1:""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.llamadoApi = this.llamadoApi.bind(this);
    this.handleSubmitRetirarVehiculo = this.handleSubmitRetirarVehiculo.bind(this);
  }

  
  handleChange(event){
    let theEvent = event || window.event;
    let input = theEvent.target.id;
    console.log(input);
    console.log(theEvent.target.value);
    this.setState({ [input]: theEvent.target.value });
    if(theEvent.preventDefault) theEvent.preventDefault();
  }

  handleSubmit(event){
    event.preventDefault();
    let datos = {};
    let placa = this.state.placa;
    let cilindraje = this.state.cilindraje;
    let tipo = this.state.tipo;

    datos = {
      placa: placa,
      cilindraje: cilindraje,
      tipo: tipo,
    };
    console.log(datos);
    this.llamadoApi(datos,"ingresarVehiculo");
    //ListaNotas.render();
    //this.llamadoApi("","listarVehiculos");
  }

  handleSubmitRetirarVehiculo(event){
    event.preventDefault();
    let placaRetiro = this.state.placaRetiro;
    console.log(placaRetiro);
    this.llamadoApi(placaRetiro,"retirarVehiculo");
    //ListaNotas.render();
    //this.llamadoApi("","listarVehiculos");
    
  }

  validate(event){
    let theEvent = event || window.event;
    let key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    let regex = /[0-9]/;
    if(!regex.test(key)){
      //theEvent.returnValue = false;
      if(theEvent.preventDefault) theEvent.preventDefault();
    } 
  }

  llamadoApi(datos,service) {
    switch(service) {
      case "ingresarVehiculo":
        ApiEstacionamientoCeiba.ingresarVehiculo(datos)
        .then(res => {
          if (typeof res !== 'undefined') {
            console.log("data");
            let mensaje = res.mensaje;
            console.log(mensaje);
            if(mensaje === "OK"){
              //alert("El registro del ingreso se ha realizado exitosamente");
              Swal(
                {
                  title:'Ingreso Vehiculo',
                  text : 'El ingreso se ha realizado exitosamente',
                  type :'success',
                  customClass:'emergenteIngresoExitoso'
                });
              this.llamadoApi("","listarVehiculos");
            }else{
              Swal(
                'Ingreso Vehiculo',
                mensaje,
                'warning'
              );
            }
          }else{
            Swal(
              'Ingreso Vehiculo',
              'Error al ingresar el vehiculo',
              'error'
            );
          }

            this.setState({
              data : res,
              placa: "",
              cilindraje: "",
              tipo: 1,
            });
        });
      break;
      
      case "retirarVehiculo":
        ApiEstacionamientoCeiba.registrarSalida(datos)
        .then(data => {
          if (typeof data !== 'undefined') {
            let factura = data;
            console.log (factura);
            if((factura.valor === null || factura.valor === 'undefined')){
              Swal(
                'Ingreso Vehiculo',
                factura.mensaje,
                'warning'
              );  
            }else{
              Swal(
                'Retirar Vehiculo',
                'El total a pagar por el tiempo de parqueo es: $'+factura.valor,
                'success',
              );
            }
            this.llamadoApi("","listarVehiculos");
          } else {
            Swal(
              'Retirar Vehiculo',
              'Error al retirar el vehiculo',
              'error'
            );
          }
          this.setState({
            placaRetiro: "",
          });
         });
        break;

        case "listarVehiculos":
          ApiEstacionamientoCeiba.consultarVehiculos()
          .then(res => {
            let vehiculos = res;
            if (typeof res !== 'undefined') {
              this.setState({
                vehiculos:vehiculos
              });
            } else {
              this.setState({
                vehiculos: null
              });
            }
            console.log(this.state.vehiculos);
          });
        break;

        default:
            console.log("El Servicio "+service+" no se encuentra registrado");
        break;
    }
  }  


  componentDidMount() {
    ApiEstacionamientoCeiba.consultarTRM()
      .then(res => {
        let precio = res;
        if (typeof res !== 'undefined') {
          this.setState({
            precioDolar:precio
          });
        } else {
          this.setState({
            precioDolar: null
          });
        }
      });
    this.llamadoApi("","listarVehiculos");

  }

  render() {
    let Items = this.state.vehiculos.map((Item, i) =>
    <tr key={i}>
      <td>{Item.placa}</td>
      <td>{Item.cilindraje}</td>
      <td>{Item.tipo}</td>
      <td>{Item.fechaIngreso}</td>
    </tr>
    );

    return (
      <div className="App">
      
        <header className="App-header">
          <img src={logoCeiba}  className="App-logoCeiba" alt="logoCeiba" />
          <h3 className="Precio-Dolar">TRM  ${this.state.precioDolar} </h3>
          <h3 className="App-title">Ceiba Estacionamiento</h3>
        </header>
        
        <Tabs   className='tabsApp'>
          <Tab id="tabIngresarVehiculo"  title="Ingresar Vehiculo" active>
            <div className="divFormularioIngreso">
              <form onSubmit={this.handleSubmit} className="formIngresoVehiculo">
                    <Input   label="Placa" id="placa" defaultValue={this.state.placa} onBlur={this.handleChange} required ><Icon>description</Icon></Input >
                    <Input  label="Cilindraje" onKeyPress={this.validate} id="cilindraje" defaultValue={this.state.cilindraje} onBlur={this.handleChange}  required ><Icon>local_gas_station</Icon></Input>
                    <Input  type='select' id="tipo" className="inputSelectTipoVehiculo" onBlur={this.handleChange} defaultValue={this.state.tipo}>
                      <option value='1'>  Moto</option>
                      <option value='2'>  Carro</option>
                    </Input>
                    <Button id="btnIngresarVehiculo" waves='light' type="submit" className="botonIngresarVehiculo">Ingresar Vehiculo<Icon left>assignment_turned_in</Icon></Button>
              </form>
            </div>
          </Tab>

          <Tab id="tabRetirarVehiculo" title="Retirar Vehiculo">
            <div className="divFormularioRetiro">
              <form onSubmit={this.handleSubmitRetirarVehiculo} className="formRetiro">
                  <Input  label="placa" id="placaRetiro" defaultValue={this.state.placaRetiro} onBlur={this.handleChange} required ><Icon>description</Icon></Input>
                  <Button waves='light' type="submit"> Retirar <Icon left>assignment_turned_in</Icon></Button>
              </form>
            </div>
            </Tab>
          
          <Tab  id="tab" title="Listar Vehiculos">
                    <table className='table table-striped'>
                    <thead>
                        <tr>
                          <th>Placa</th>
                          <th>Cilindraje</th>
                          <th>Tipo</th>
                          <th>Fecha Ingreso</th>
                        </tr>
                      </thead>
                    <tbody>
                        {Items}
                      </tbody>
                    </table>
          </Tab>
        
        </Tabs>


        <Footer className="divFooter" copyrights="© 2018 Santiago Ramírez"><center> Proyecto de entrenamiento ADN Ceiba </center></Footer>

      </div>
    );
  }

}

export default App;