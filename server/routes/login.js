const express = require('express');
const Usuario = require('../models/usuario');
const {Response,responseExitoso, responseFallido} = require ('../models/response/response');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

app.post('/login', (req, res)=> {

    let body = req.body;
    let respuesta = new Response();

    console.log('Body: ', body);

    Usuario.findOne({email: body.email},(err, usuarioDB)=> {

        if (err){
            console.log('err:', err);
            respuesta = responseFallido(err)
            res.status(500).json(
                respuesta
            )
        }
        else {
            if (!usuarioDB)
            {
                respuesta = responseFallido('Usuario incorrecto')
                return res.status(400).json(
                    respuesta
                )
            }

            console.log('usuarioDB', usuarioDB);

           if( !bcrypt.compareSync(body.password, usuarioDB.password)){
            respuesta = responseFallido('Contraseña incorrecta')
            return res.status(400).json(
                respuesta
            )
           }

           let token = jwt.sign({
            usuario: usuarioDB
        },process.env.SEED, {expiresIn: process.env.caducidad_token});

            respuesta = responseExitoso(usuarioDB, token);

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