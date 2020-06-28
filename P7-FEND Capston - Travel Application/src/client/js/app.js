const axios = require('axios');


//Geo Name API function
const geoNameAPIcall = async function(sehar){
    const geoNameID = 'itsmanojkumar';

    const Url = 'http://api.geonames.org/searchJSON?formatted=true&q='+sehar+'&username='+geoNameID+'&style=full'; 
    let res = "";
     await axios.get(Url)
        .then(function (response) {
          const cityObj = {};
          const data = response.data;
          
          cityObj["latitude"] = data.geonames[0].lat;
          cityObj["longitude"] = data.geonames[0].lng;
          cityObj["population"] = data.geonames[0].population;
          cityObj["countryCode"] = data.geonames[0].countryCode;
          console.log(cityObj)
          res = cityObj;
         
        })
        .catch(function (error) {
            console.log(error);
        });

    return res
  }
  
  
  //Weather Bit API Function
  const weatherForecastAPIcall = async function (lat, lon ) {
    
      const weatherAPI_Key= '0c0f0e8e9e40431ebca86360735838e8';
      
      const Url ='https://api.weatherbit.io/v2.0/forecast/daily?lat=+'+lat+'&lon='+lon+'&key='+weatherAPI_Key;
      let res = "";
     await axios.get(Url)
      .then(function (response) {
          res = response.data;
      })
      .catch(function (error) {
          console.log(error);
      });

      return res;
    }
  
  
  //Pixelbay API Function
   export async function imageURLAPIcall(sehar, desh) {
      
      const pixabayAPI_Key = '17202968-b881322094457cee92aef758c';

      const seharURL = 'https://pixabay.com/api/?key='+pixabayAPI_Key+'&q='+sehar+'&image_type=photo&pretty=true&category=places';
      const deshURL = 'https://pixabay.com/api/?key='+pixabayAPI_Key+'&q='+desh+'&image_type=photo&pretty=true&category=places';
      let res = "";
      await axios.get(seharURL)
      .then(function (response) {
          let jsonOutput = response.data;
          if (jsonOutput.totalHits !== 0) {
            res = jsonOutput.hits[0].largeImageURL;
          }
          
      })
      .catch(function (error) {
          console.log(error);
      });
      if(res === "")
      {
        await axios.get(deshURL)
              .then(function(response){
                let jsonOutput = response.data;
                if (jsonOutput.totalHits !== 0) {
                  res = jsonOutput.hits[0].largeImageURL;
                }
              })
              .catch(function (error) {
                console.log(error);
              }); 
      }

      return res;
    }
  
  
  
  // Rest API Function
  const countryInfoAPIcall =  async function (zipCode) {
  
      const Url = 'https://restcountries.eu/rest/v2/alpha/'+zipCode;
      let res = "";
      await axios.get(Url)
      .then(function (response) {
          res = { name: response.data.name};
      })
      .catch(function (error) {
          console.log(error);
      });

      return res;
    }
  
  
    export {geoNameAPIcall, weatherForecastAPIcall, countryInfoAPIcall}