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