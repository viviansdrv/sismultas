'use strict';

const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Pgepa@2021',
    database: 'testetrabalhomultas'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Conectado ao banco de dados.');
});

function getHomePage(req,res) {
    let query = 'SELECT gestor.nome, motivo.causa, multa.valor_total valor, qtd_parcelas parcelas, ' +
        'IF(pago=0,"pendente","pago") pago FROM ((multa INNER JOIN gestor ON gestor.cod = multa.cod_gestor) ' +
        'INNER JOIN motivo ON motivo.cod = multa.cod_motivo);';
    
    db.query(query, (err,result) => {
        if (err) {
            res.redirect('/');
        }
        res.render('index.ejs', {
            multas: result
        });
    });
}

module.exports = {getHomePage};
