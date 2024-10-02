const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.get('/', (req, res) => {
  res.send('hello world')
});

app.listen(8080);
