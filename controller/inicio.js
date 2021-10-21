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
                result[ i ].restantes = parcResult[ i ].parc_restantes;
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
    let nome = req.body.nome;
    let causa = req.body.causa;
    let valor = req.body.valor_total;
    let parcela = req.body.qtd_parcelas;
    //let valor = req.body.valor_total;
    //let parcela = req.body.qtd_parcelas;

}