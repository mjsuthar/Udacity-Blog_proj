/* Global Variables */
const token = '0b2f20ec28787a314667e2d55c228540';
const url = 'https://api.openweathermap.org/data/2.5/weather?q=';

function dateInStr(sec)
{
    var monthList = ["jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct","Nov","Dec"];

    var date = new Date(sec*1000);
    var end = "th";
    if(date.getDate() === 1){
      end = "st";
    }else if(date.getDate() === 2){
      end = "nd";
    }else if(date.getDate() === 3){
      end = "rd";
    }

    var dateStr = monthList[date.getMonth()]+','+date.getDate()+end+' '+date.getFullYear();

    return dateStr;

}


document.getElementById('generate').addEventListener('click', performAction);

function performAction() {
  const zip = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;

  getAPIData(url, zip, token)
    .then(function(data) {
      
      postWeatherData('/addNewData', {
        temperature: data.main.temp,
        date: dateInStr(data.dt),
        userResponse: feelings
      });
    })
    .then(() => updateUI());
}

// Async GET
/* Function to GET Web API Data*/
const getAPIData = async (baseURL, zip, API_KEY) => {
  if (zip.toString().length !== 5) {
    alert('Invalid Zipcode!!');
  } else {
    /* Please note as country is not specified so, the search works for USA as a default. */
    const url = baseURL+zip+"&appid="+API_KEY+"&units=imperial";

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
  const request = await fetch('/getAllData');
  try {
    const data = await request.json();
    console.log('updateUI: ', data);
    document.getElementById('date').innerHTML = 'Date: '+data.date;
    document.getElementById('temp').innerHTML = 'Temp(°C): '+data.temperature;
    document.getElementById('content').innerHTML = 'About you: '+data.userResponse;
  } catch (error) {
    console.log('error', error);
  }
};