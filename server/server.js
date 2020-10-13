require('./config/config');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))
 
app.use(bodyParser.json())

app.get('/producto', (req, res)=> {

    res.json('sdsds');


});

app.post('/producto', (req, res)=> {

    let body = req.body;
    res.json(body);


});

app.put('/producto/:id', (req, res)=> {

    let id = req.params.id;

    res.json(id);


});

app.delete('/producto', (req, res)=> {

    res.json('sdsds');


});
app.listen(process.env.PORT, console.log('Iniciado en el puerto', process.env.PORT));