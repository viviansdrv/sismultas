'use strict';

exports.getGestorPage = (req,res) => {
    let query = 'SELECT gestor.cod cod, gestor.nome nome, gestor.cpf cpf, orgao.nome orgao ' +
        'FROM gestor INNER JOIN orgao ON gestor.cod_orgao = orgao.cod;'
    
    db.query(query, (err,result) => {
        if (err) {
            res.redirect('/');
        }
        res.render('gestor.ejs', {
            title: 'Gestores',
            gestores: result
        });
    });
}

exports.adicionarGestorPage = (req,res) => {
    let query = 'SELECT nome FROM orgao ORDER BY cod ASC;';

    db.query(query, (err,result) => {
        if (err) {
            res.redirect('/');
        }
        res.render('add-gestor.ejs',{
            title: 'Adicionar um novo gestor',
            orgaos: result
        });
    });
}

exports.editarGestorPage = (req,res) => {
    let gestorId = req.params.id;
    let orgaoQuery = 'SELECT nome FROM orgao ORDER BY cod ASC;';
    let gestorQuery = 'SELECT * FROM gestor WHERE cod=' + gestorId + ';';

    db.query(orgaoQuery, (err,orgaoResult) => {
        if (err) {
            res.redirect('/');
        }
        orgaoResult.forEach( orgao => {
            orgao.selected = '';
        });
        db.query(gestorQuery, (err,gestorResult) => {
            if (err) {
                res.redirect('/');
            }
            orgaoResult[gestorResult[0].cod_orgao - 1].selected = 'selected';
            res.render('edit-gestor.ejs',{
                title: 'Adicionar um novo gestor',
                gestor: gestorResult[0],
                orgaos: orgaoResult
            });
        });
    });
}

exports.adicionarGestor = (req,res) => {
    let nome = req.body.nome;
    let cpf = req.body.cpf;
    let orgao = req.body.orgao;
    let codigo = -1;

    let codOrgaoQuery = "SELECT cod FROM orgao WHERE nome LIKE '%" + orgao + "%';";
    db.query(codOrgaoQuery, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.length === 1) {
            codigo = Number(result[0].cod);
        }
        let gestorQuery = "SELECT * FROM gestor WHERE nome LIKE '%" + nome + "%';";
        db.query(gestorQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                res.render('add-gestor.ejs',{
                    title: 'Adicionar um novo gestor'
                });
            } else {
                let insertQuery = "INSERT INTO gestor(nome, cpf, cod_orgao) VALUES ('" +
                    nome + "','" + cpf + "'," + codigo + ");";
                db.query(insertQuery, (err, result) => {
                    if (err) {
                        res.status(500).send(err);
                    }
                    res.redirect('/');
                });
            }
        });
    });
}

exports.editarGestor = (req,res) => {
    let gestorId = req.params.id;
    let nome = req.body.nome;
    let cpf = req.body.cpf;
    let orgao = req.body.orgao;
    let codigo = -1;

    let codOrgaoQuery = "SELECT cod FROM orgao WHERE nome LIKE '%" + orgao + "%';";
    db.query(codOrgaoQuery, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if ( result.length === 1 ) {
            codigo = Number(result[0].cod);
        }
        let gestorUpdateQuery = "UPDATE gestor SET nome='"+ nome + "', cpf='" + cpf + "', cod_orgao=" + codigo +
            " WHERE gestor.cod=" + gestorId +";";
        db.query(gestorUpdateQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    });
}

exports.deletarGestor = (req,res) => {
    let gestorId = req.params.id;
    let deleteQuery = 'DELETE FROM gestor WHERE cod=' + gestorId + ';';
    db.query(deleteQuery, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/');
    });
}
