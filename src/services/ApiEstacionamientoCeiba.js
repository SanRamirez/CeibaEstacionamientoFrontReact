import RequestService from './requestService'

const BASE_URL = 'http://localhost:8080/api/v1.0/estacionamiento';


class ApiEstacionamientoCeiba{
    
    ingresarVehiculo(datos){
        datos = JSON.stringify(datos);
        let options =  {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: datos
          }
        let url = `${BASE_URL}/registrarIngresoVehiculo`;
        return RequestService.getRequest(url,options);
      }

    consultarTRM(){
      //datos = JSON.stringify(datos);
      let options =  {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      //body: datos
      }
      let url = `${BASE_URL}/trm`;
      return RequestService.getRequest(url,options);
      }

      registrarSalida(placa){
        //datos = JSON.stringify(datos);
        let options =  {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            
          }
        let url = `${BASE_URL}/registrarSalidaVehiculo/${placa}`;
        return RequestService.getRequest(url,options);
      }

      consultarVehiculos(){
        let options =  {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        }
        let url = `${BASE_URL}/consultarVehiculos`;
        return RequestService.getRequest(url,options);
        }





}
export default new ApiEstacionamientoCeiba()