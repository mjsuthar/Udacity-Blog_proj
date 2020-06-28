import './style/style.scss';

import {geoNameAPIcall, weatherForecastAPIcall, imageURLAPIcall, countryInfoAPIcall} from './js/app';
import {getDestinationName, tripDates, duration, dateFormat} from './js/helperFunction';


//alert("We are in app.js");


const tripObj = {};

const hereWeGo = async(event) =>{
    event.preventDefault();
    
    const todayDate = new Date();
    const destiny = getDestinationName();
    const dates = tripDates();
    
    const weatherObjIndex = duration(todayDate, dates[0])
    const despatureDateInStr = dateFormat(dates[0]);
    const returnDateInStr = dateFormat(dates[1]);
    
    tripObj.destiny = destiny;
    tripObj.startDate = dates[0];
    tripObj.endDate = dates[1];
    tripObj.totalDays = duration(dates[0], dates[1]);
    
    let geo = await geoNameAPIcall(tripObj.destiny);
    let contryInfo = await countryInfoAPIcall(geo["countryCode"]);
    
    tripObj.countryCode = geo["countryCode"];

    tripObj.countryName = contryInfo["name"];
    tripObj.countryImage = await imageURLAPIcall(tripObj.destiny, tripObj.countryName);
    tripObj.countryWeatherForcast = await weatherForecastAPIcall(geo["latitude"], geo["longitude"]);
    
    const weatherObj = {temp:0, desc:""};

    weatherObj.temp = tripObj.countryWeatherForcast.data[weatherObjIndex].temp;
    weatherObj.desc = tripObj.countryWeatherForcast.data[weatherObjIndex].weather.description;

    const div = document.createElement('div');
    div.classList.add('new-trip');
    document.querySelector('.trip_list').appendChild(div);

    div.innerHTML =` 
    <div class="row">
        <div class="col-sm-12 col-md-12">
            <div class="card">
                <img src="${tripObj.countryImage}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Your Trip Details.</h5>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Destiny: ${destiny}, ${tripObj.countryName}</li>
                    <li class="list-group-item">Trip Start Date: ${despatureDateInStr}</li>
                    <li class="list-group-item">Trip End Date: ${returnDateInStr}</li>
                    <li class="list-group-item">Total Number of Days ${tripObj.totalDays}</li>
                    <li class="list-group-item">City Tempreture: ${weatherObj.temp}</li>
                    <li class="list-group-item">Desc: ${weatherObj.desc}</li>
                </ul>
            </div>
        </div>
    </div>`
}

document.getElementById('submit-Trip').addEventListener('click', hereWeGo);
