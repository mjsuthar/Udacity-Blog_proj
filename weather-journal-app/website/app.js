/* Global Variables */
const APIkey = '&appid=0dd017e11774b437376bbc988f77766c&units=imperial';
const url = 'https://api.openweathermap.org/data/2.5/weather?q=';


// date Convert in format dd/MMM/yyyy;
function dateConvert(seconds)
{
    var monthArray = ["jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct","Nov","Dec"];

    var date = new Date(seconds*1000);

    var dateInStr = monthArray[date.getMonth()]+'/'+date.getDate()+'/'+date.getFullYear();

    return dateInStr;

}


document.getElementById('generate').addEventListener('click', performAction);

function performAction() {
  const zip = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;

  getAPIData(url, zip, APIkey)
    .then(function(data) {
      // Add data
      console.log('AllData from api: ', data);
      postWeatherData('/addWeatherData', {
        temperature: data.main.temp,
        date: dateConvert(data.dt),
        userResponse: feelings
      });
    })
    .then(() => updateUI());
}

// Async GET
/* Function to GET Web API Data*/
const getAPIData = async (baseURL, zip, API_KEY) => {
  if (zip.toString().length !== 5) {
    alert('zip should be of length 5!');
  } else {
    /* Please note as country is not specified so, the search works for USA as a default. */
    const url = baseURL+zip+API_KEY;

    const request = await fetch(url);
    try {
      // Transform into JSON
      const allData = await request.json();
      if (allData.message) {
        alert(allData.message);
      } else {
        return allData;
      }
    } catch (error) {
      console.log('error', error);
      // appropriately handle the error
    }
  }
};

// Async POST
/* Function to POST data */
// Async POST
const postWeatherData = async (url = '', data = {}) => {
  console.log('post weather data: ', data);
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });

  try {
    const newData = await response.json();
    console.log('post res: ', newData);
  } catch (error) {
    console.log('error', error);
  }
};

/* Function to update UI */
const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const data = await request.json();
    console.log('updateUI: ', data);
    document.getElementById('date').innerHTML = 'Date: '+data.date;
    document.getElementById('temp').innerHTML = 'Temp(°C): '+data.temperature;
    document.getElementById('content').innerHTML = 'Your Feelings: '+data.userResponse;
  } catch (error) {
    console.log('error', error);
  }
};