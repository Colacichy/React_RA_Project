const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.get('/', (req, res) => {
  res.send('hello world')
});


app.get('/abc', (req, res) => {
  res.statusCode = 500
  res.send('hello world')
});

// sci / 4c / abc

const sciRouter = express.Router()

sciRouter.get('/', (req, res) => {
  res.send('Sci')
})

sciRouter.get('/json', (req, res) => { 
  const data = [{
    key1: "text",
    key2: 20
  }]
  res.json(data)
})

app.post('/abc', (req, res) => {
  res.statusCode = 500
  res.send('hello world cos innego')
});

app.delete('/abc', (req, res) => {
  res.statusCode = 500
  res.send('hello world cos innego ale do usuniecia')
});

app.listen(8080, () =>{
  console.log("Cokolwiek");
});


app.use('/sci/4c/abc', sciRouter)