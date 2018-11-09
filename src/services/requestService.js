//const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
//let url = "http://localhost:8080/api/v1.0/estacionamiento";

/*
const options =  {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  }
*/

class RequestService {

    // async function
    async getRequest(url,options){
      let data = await (await (fetch(url ,options)
        .then(res => {
          return res.json()
        })
        .catch(err => {
          //console.log('Error: ', err)
          return err;
        })
      ))
      return data
    }
}
    
export default new RequestService()