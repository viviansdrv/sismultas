'use strict';

exports.getGestorPage = (req,res) => {
    let query = 'SELECT gestor.nome nome, gestor.cpf cpf, orgao.nome orgao ' +
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
    res.render('add-gestor.ejs',{
        title: 'Adicionar um novo gestor'
    });
}

exports.adicionarGestor = (req,res) => {
    let nome = req.body.nome;
    let cpf = req.body.cpf;
    let orgao = req.body.orgao;
    let codigo = -1;

    console.log(`req.body.nome = ${nome}`);
    console.log(`req.body.cpf = ${cpf}`);
    console.log(`req.body.orgao = ${orgao}`);

    let codOrgaoQuery = "SELECT cod FROM orgao WHERE nome LIKE '%" + orgao + "%';";
    db.query(codOrgaoQuery, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.length === 1) {
            codigo = Number(result[0].cod);
            console.log(`codigo = ${codigo}`);
        }
    });

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
}
