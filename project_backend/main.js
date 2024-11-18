const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json()); 

let allFormData = [];

app.post('/task02/postData', (req, res) => {
  const newData = req.body;
  allFormData.push(newData);
  res.status(200).send({ message: 'Data received' });
});

app.get('/task02/getData', (req, res) => {
  res.status(200).json({
    message: 'Fetched all form data successfully!',
    data: allFormData 
  });
});


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
