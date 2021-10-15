const express = require ('express');
const app = express();

// Ajustes
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);
app.use(function (req, res, next) {

    res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();

});

//Middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Routes
app.use('/api/peliculas',require('./routes/peliculas'));

app.use(function(req, res, next) {
    res.redirect('/api/peliculas');
});

//Iniciando servidor

app.listen(app.get('port'),()=>{
    console.log(`Servidor en el puerto ${app.get('port')}`);
});