'use strict';

exports.getHomePage = (req,res) => {
    let query = 'SELECT gestor.nome, motivo.causa, multa.valor_total valor, qtd_parcelas parcelas, ' +
        'IF(pago=0,"pendente","pago") status, multa.cod cod FROM ((multa INNER JOIN gestor ON gestor.cod = multa.cod_gestor) ' +
        'INNER JOIN motivo ON motivo.cod = multa.cod_motivo);';

    let parcelasFaltantesQuery = 'SELECT * FROM parc_multa;';

    db.query(query, (err,result) => {
        if (err) {
            res.redirect('/');
        }
        db.query(parcelasFaltantesQuery, (err,parcResult) => {
            if (err) {
                res.redirect('/');
            }
            parcResult.forEach( row => {
                console.log(`cod = ${row.cod} ; cod_multa = ${row.cod_multa} ; parc_restantes = ${row.parc_restantes}`);
            })
            for ( let i = 0; i < result.length; i++) {
              for ( let j = 0; j < parcResult.length; j++ ) {
                if ( result[ i ].cod === parcResult[ j ].cod_multa ) {
                  result[ i ].restantes = parcResult[ j ].parc_restantes;
                }
              }
            }
            res.render('index.ejs', {
                title: 'Sistema de multas',
                multas: result
            });
        })
        
    });
}

exports.atualizarMulta = (req,res) => {
    let cod_multa = req.params.id;
    let query = 'CALL atualizarpagmulta(' + cod_multa + ')';
    db.query(query, (err,result) => {
        if (err) {
            res.redirect('/');
        }
        console.log('multa atualizada!');
        res.redirect('/');
    });
}

exports.adicionarMultaPage = (req,res) => {
    let query = 'SELECT nome FROM gestor ORDER BY nome ASC;';
    let motivoQuery = 'SELECT causa FROM motivo;';
    db.query(query, (err,result) => {
        if (err) {
            res.redirect('/');
        }
        db.query(motivoQuery, (err,motivoResult) => {
            if (err) {
                res.redirect('/');
            }
            res.render('add-multa.ejs',{
                title: 'Adicionar uma nova multa',
                gestores: result, 
                motivos: motivoResult
            }); 

        });
        
    });
}

exports.adicionarMulta = (req,res) => {
    let gestor = req.body.gestor;
    let motivo = req.body.motivo;
    let valor = req.body.valor;
    let parcelas = req.body.parcelas;
    let codigoGestor = -1;
    let codigoMotivo = -1;

    let codOrgaoQuery = "SELECT cod FROM gestor WHERE nome LIKE '%" + gestor + "%';";
    db.query(codOrgaoQuery, (err, codOrgaoResult) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (codOrgaoResult.length === 1) {
            codigoGestor = Number(codOrgaoResult[0].cod);
        }
        let codMotivoQuery = "SELECT cod FROM motivo WHERE causa LIKE '%" + motivo + "%';";
        db.query(codMotivoQuery, (err, codMotivoResult) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (codMotivoResult.length === 1) {
                codigoMotivo = Number(codMotivoResult[0].cod);
            }
            let insertQuery = 'INSERT INTO multa(cod_gestor,cod_motivo,valor_total,qtd_parcelas) VALUES (' +
                codigoGestor + ',' + codigoMotivo + ',' + valor + ',' + parcelas + ');';
            db.query(insertQuery, (err, result) => {
                if (err) {
                    res.status(500).send(err);
                }
                console.log('Multa inserida com sucesso.');
                res.redirect('/');
            });
        });
    });
}
