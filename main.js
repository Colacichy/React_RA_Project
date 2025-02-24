const cors = require('cors');
const express = require('express');
const fs = require('fs')
const app = express();

app.use(cors());
app.use(express.json());

const data = require('./_data.json')

app.get('/', (req, res) => {
    res.json({
        key: 'Hello World!',
    });
});

app.get('/employees', (req, res) => {
    res.send(data)
});


app.listen(8080, () => {
    console.log('Server listening');
});
