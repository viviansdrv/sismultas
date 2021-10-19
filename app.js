'use strict';

const path = require('path');
const express = require('express');
const app = express();
const {getHomePage} = require('./routes/index');
const PORT = 5000;

app.set('port', process.env.port || PORT);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get('/',getHomePage);

app.listen(PORT, () => {
    console.log(`Servidor em execução na porta ${PORT}.`);
});
