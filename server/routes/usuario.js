const express = require('express');
const Usuario = require('../models/usuario');
const {Response,responseExitoso, responseFallido} = require ('../models/response/response');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const app = express();
app.get('/usuario', (req, res)=> {

    Usuario.find({})
            .exec((err, usuarioDB)=>{
                
                if (err){
                    console.log('err:', err);
                    respuesta = responseFallido(err)
                    res.status(400).json(
                        respuesta
                    )
                }
                else {
                    console.log('usuarioDB', usuarioDB);
                    respuesta = responseExitoso(usuarioDB);
                    res.json(
                        respuesta
                    )
                }
            })

});

app.post('/usuario', (req, res)=> {

    let body = req.body;
    let respuesta = new Response();

    console.log('Body', body);

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password,10),
        role: body.role,
        
    });

    console.log('usuario', usuario);

    usuario.save((err, usuarioDB)=> {

        if (err){
            console.log('err:', err);
            respuesta = responseFallido(err)
            res.status(400).json(
                respuesta
            )
        }
        else {
            console.log('usuarioDB', usuarioDB);
            respuesta = responseExitoso(usuarioDB);
            res.json(
                respuesta
            )
        }
    });
});


app.put('/usuario/:id', (req, res)=> {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);
    let respuesta = new Response();

    console.log('body:', body);
    Usuario.findByIdAndUpdate(id, body, {new: true}, (err, usuarioDB)=>{
        
        if (err){
            console.log('err:', err);
            respuesta = responseFallido(err)
            res.status(400).json(
                respuesta
            )
        }
        else {
            console.log('usuarioDB put: ', usuarioDB);
            respuesta = responseExitoso(usuarioDB);
            res.json(
                respuesta
            )
        }
    });

});

app.delete('/usuario/:id', (req, res)=> {

    let id = req.params.id;
    let respuesta = new Response();

    Usuario.findByIdAndRemove(id, (err, usuarioDB)=>{
        
        if (err){
            console.log('err:', err);
            respuesta = responseFallido(err);
            console.log(respuesta);
            res.status(400).json(
                respuesta
            )
        }
        else {
            console.log('usuarioDB remove: ', usuarioDB);
            respuesta = responseExitoso(usuarioDB);
            console.log(respuesta);
            res.json(
                respuesta
            )
        }
    });


});

module.exports = app;