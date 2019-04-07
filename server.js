const express = require('express');
const melanoma = require('./src/melanoma');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.get('/stuff', (req, res) => {
  res.send(melanoma.kernelClose);
});

app.get('/about', (req, res) => {
  res.sendFile('about.html', { root: path.join(__dirname, '/public') });
});

app.listen(3000, () => {
  console.log('server running on 3000');
});
