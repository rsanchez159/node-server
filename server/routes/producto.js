const express = require('express');

const app = express();
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

module.exports = app;