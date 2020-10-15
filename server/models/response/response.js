class Response {
    codigoRespuesta
    mensajeRespuesta
    data
}

let response = new Response();

const responseExitoso = (data)=> {
    console.log('responseExitoso', data);

    response = new Response();
    response.codigoRespuesta = 0
    response.mensajeRespuesta = 'Ok',
    response.data = data
    return response;
};

const responseFallido = (err)=> {

    response = new Response();
    response.codigoRespuesta = 1
    response.mensajeRespuesta = err,
    response.data = null
    return response;
    };
    

module.exports = {Response, responseFallido, responseExitoso};