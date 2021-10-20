'use strict';

const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const {getHomePage} = require('./controller/inicio');
const {getGestorPage, adicionarGestorPage, adicionarGestor} = require('./controller/gestor');
const PORT = 5000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Pgepa@2020',
    database: 'testetrabalhomultas'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Conectado ao banco de dados.');
});

global.db = db;

app.set('port', process.env.port || PORT);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', getHomePage);
app.get('/gestor', getGestorPage);
app.get('/add-gestor', adicionarGestorPage);

app.post('/add-gestor', adicionarGestor);

app.listen(PORT, () => {
    console.log(`Servidor em execução na porta ${PORT}.`);
});
