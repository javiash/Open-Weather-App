const express = require('express');
const app = express();
const weatherRoutes = require('./routes/weather-routes');
const bodyParser = require('body-parser');
const cors = require('cors');

//allow cross-origin request
app.use(cors());

app.use(express.static(__dirname + '/build'));

app.use(bodyParser.json());

app.use('/v1', weatherRoutes);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/build/index.html');
});

app.get('/*', (req, res) => {
  res.redirect('/');
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Listening port ${PORT}`);
});

module.exports = app;
