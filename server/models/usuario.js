const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let rolesValidos = {
   values: ['ADMIN_ROLE',
             'USER_ROLE'],
   message: '{VALUE} no es un rol valido'
}

let userSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Nombre obligatorio']
    },
    email: { 
        type: String,
        unique: true,
        required: [true, 'Email obligatorio']
     },
     password: { 
        type: String,
        required: [true, 'Contraseña obligatorio']
     },
     img: { 
        type: String,
        required: false
     },
     role: { 
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
     },
     estado: { 
        type: Boolean,
        required: false,
        default: true
     },
     google: { 
        type: String,
        required: false,
        default: false
     }
});

userSchema.plugin(unique,
                  {
                     message: '{PATH} debe ser único'
                  });

module.exports = mongoose.model('Usuario', userSchema);