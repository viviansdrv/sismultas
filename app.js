'use strict';

const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const inicio = require('./controller/inicio');
const gestor = require('./controller/gestor');
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

app.get('/', inicio.getHomePage);
app.get('/gestor', gestor.getGestorPage);
app.get('/add-gestor', gestor.adicionarGestorPage);
app.get('/add-multa', inicio.adicionarMultaPage);
app.get('/edit-gestor/:id', gestor.editarGestorPage);
app.get('/delete-gestor/:id', gestor.deletarGestor);
app.get('/atualizarmulta/:id', inicio.atualizarMulta);

app.post('/add-gestor', gestor.adicionarGestor);
app.post('/add-multa', inicio.adicionarMulta);
app.post('/edit-gestor/:id', gestor.editarGestor);


app.listen(PORT, () => {
    console.log(`Servidor em execução na porta ${PORT}.`);
});
