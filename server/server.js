require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

console.log(process.env.URLDB);
const conexionBD = async ()=> {
await mongoose.connect(process.env.URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}, (err, res)=> {

    if (err) {
        console.log(err);
    }
    else {
        console.log('Bd Ok');
    }
    
    });
}

const app = express();


app.use(bodyParser.urlencoded({ extended: false }))
 
app.use(bodyParser.json())

app.use( require('./routes/producto') );

app.use( require('./routes/usuario') );

conexionBD();
app.listen(process.env.PORT, console.log('Iniciado en el puerto', process.env.PORT));