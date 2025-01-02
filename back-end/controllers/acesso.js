const mongoose = require("mongoose");

const db = mongoose.connection


const getAcesso = (req,res, next) => {
   
    console.log('SENHA : guQ1sta71');
    next()
}

const postPaginaInicial = async (req,res, next) => {
    let {usuario, senha} = req.body
    try{
        const resultado = await db.useDb("PF").collection("Acesso").find({}).toArray()

        if(usuario == resultado[0].acesso && senha == resultado[0].senha){
            res.json({
                success: true,
                redirectTo: '/admin'
            })
        }else{
            res.json({mensagem_de_erro: "Não foi possível efetuar o login! Por favor tente novamente!"})
            // console.log(senha)
        }

        console.log(usuario)
        console.log(senha)
    } catch(erro) {
        res.status(500).json({ error: "Erro ao buscar dados" });
    }

    next()
}



module.exports = {
    getAcesso,
    postPaginaInicial,
}