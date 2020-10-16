//Configuracion del puerto
process.env.PORT = process.env.PORT || 3000;

//Configuracion URL para prod
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//Vencimiento token login
process.env.caducidad_token = 60*60*24;

//Firma validacion token
process.env.SEED = process.env.SEED || 'secret';

//Url

let urlDB;
if (process.env.NODE_ENV === 'dev')
{
    urlDB = 'mongodb://localhost:27017/AlbumPeru';
}
else
{
    urlDB = process.env.urlDB;
}

process.env.URL = urlDB;

