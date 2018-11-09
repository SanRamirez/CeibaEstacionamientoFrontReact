import React, { Component } from 'react';
import logoCeiba from './logoCeibaSoftware.png';
import './App.css';
import ApiEstacionamientoCeiba from './services/ApiEstacionamientoCeiba'
import ListaNotas from './components/listaVehiculos/ListaVehiculos.js'
import {Button, Icon,Footer,Input,Tab,Tabs,Row} from 'react-materialize';

class App extends Component {

  constructor(){
    super()
    this.state = {
      placa: "",
      cilindraje: 0,
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
    let input = event.target.id;
    this.setState({ [input]: event.target.value });
  }

  handleSubmit(event){
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
    event.preventDefault();
  }

  handleSubmitRetirarVehiculo(event){
    let placaRetiro = this.state.placa;
    console.log(placaRetiro);
    this.llamadoApi(placaRetiro,"retirarVehiculo");
    event.preventDefault();
  }

  llamadoApi(datos,service) {
    switch(service) {
      case "ingresarVehiculo":
        ApiEstacionamientoCeiba.ingresarVehiculo(datos)
        .then(data => {
          if (typeof data !== 'undefined') {
            this.setState({
              data
            });
          } else {
            this.setState({
              data: null
            });
          }
          //this.comprobarDatos();
        })
      break;
      
      case "retirarVehiculo":
        ApiEstacionamientoCeiba.registrarSalida(datos)
        .then(data => {
          if (typeof data !== 'undefined') {
            this.setState({
              data
            });
          } else {
            this.setState({
              data: null
            });
          }
          //this.comprobarDatos();
         })
        break;

        case "listarVehiculos":
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
    return (
      <div className="App">
    
      <header className="App-header">
        <img src={logoCeiba}  className="App-logoCeiba" alt="logoCeiba" />
        <h3 className="App-title">Ceiba Estacionamiento</h3>
        <h3 className="Precio-Dolar">TRM  ${this.state.precioDolar} </h3>
      </header>
     
      <Tabs className='tapContainer'>
        <Tab title="Ingresar Vehiculo" color="black" active>
          <div className="divFormularioIngreso">
            <form onSubmit={this.handleSubmit}>
              <br/>
                <div className="Titulo">
                  <h1>Ingresar Vehiculo</h1>
                </div>
                <Input  label="ingrese la placa" id="placa" onChange={this.handleChange}  required ><Icon>description</Icon></Input>
                <Input  label="ingrese el cilindraje" id="cilindraje" onChange={this.handleChange}  required ><Icon>local_gas_station</Icon></Input>
                <Input  type='select' id="tipo" onChange={this.handleChange} defaultValue='1'>
                <option value='1'>Moto</option>
                <option value='2'>Carro</option>
                </Input>
                <Button waves='light' type="submit">Ingresar Vehiculo<Icon left>assignment_turned_in</Icon></Button>
            </form>
          </div>
        </Tab>
        
        <Tab title="Retirar Vehiculo" >
          <div className="divFormularioRetiro">
            <form onSubmit={this.handleSubmitRetirarVehiculo}>
              <br/>
                <div className="TituloRetiro">
                  <h1>Retirar Vehiculo</h1>
                </div>
                <div>
                <Input  label="ingrese la placa" id="placa" onChange={this.handleChange}  required ><Icon>description</Icon></Input>
                <br/>
                <Button waves='light' type="submit">Retirar<Icon left>assignment_turned_in</Icon></Button>
                </div>
            
            </form>
          </div>
        
        </Tab>
     
        <Tab title="Vehiculos Parqueados">
          <ListaNotas/>
        </Tab>
      
      </Tabs>

    <Footer class="divFooter" copyrights="&copy Copyright  Ceiba Software 2018" className='example'> 
      </Footer>

      </div>
    );
  }

}

export default App;
