var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

var aylien = require('aylien_textapi');
const bodyParser = require('body-parser');

require('dotenv').config()
//console.log(`${process.env.API_ID}`)


const textapi = new aylien({
  application_id: process.env.APP_ID,
  application_key: process.env.API_KEY
});

const app = express()

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})



app.get('/test', function (req, res) {
  res.send(mockAPIResponse)
})


app.post('/testing', async (req, res, next) => {
    console.log(req.body);
    try {
      var data = textapi.sentiment({
        'text': req.body.theText
      }, function(error, response) {
        
        if (error === null) {
          res.send(response);
        }
        else
        {
          response = {"text":""};
          res.send(response);
        }
      });
    
    } catch(error) {
      return next(error)
    }
  
  })
  