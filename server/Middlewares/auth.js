const jwt = require('jsonwebtoken');

let verificarToken = (req, res, next)=>{

    const seed = process.env.SEED;
    console.log('seed: ', seed);
    let token = req.get('Authorization');
    console.log('token: ', token);
    jwt.verify(token, seed, (err, decoded)=>{

        if(err)
        {
            console.log('err:', err);
            return res.status(400).json({
                error: err
            });
        }

        console.log('decoded', decoded);
        req.usuario = decoded.usuario;
        next();

    })
    
}

let verificarRol = (req, res, next)=>{

    
    
    let usuario = req.usuario;
    console.log('usuario: ', usuario);

    if(usuario.role === 'ROLE_ADMIN'){
        next();
    }
    else
    {
        res.json({
            error: 'Rol no valido'
        })
    }
    
}

module.exports = {
    verificarToken,
    verificarRol
}