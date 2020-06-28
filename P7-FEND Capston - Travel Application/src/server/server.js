const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

/* Server Setup */
const app = express();
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static('./dist'));

const PORT = 8000;
const server = app.listen(PORT, listener);

function listener()
{
  console.log("Server is running on Port "+PORT);
}

app.get('/Test', function (req, res) {
  res.status(200).send('ok');
});

/* Routes */

app.get('/', (req, res) => {
  res.send('./dist/index.html');
});


module.exports = app;