const mongoose = require("mongoose");

const db = mongoose.connection;
const Investimento = require("../models/investimento")

const getAdmin = async (req, res) => {
    try {
        const acesso = await db.useDb("PF").collection("Acesso").find({}).toArray();
        const investimento = await db.useDb("PF").collection("Investimentos").find({}).toArray()
        res.json({ 
            investimento: investimento,
            nome_usuario: acesso[0].nome,
         }); 
    } catch (erro) {
        res.status(500).json({ error: "Erro ao buscar dados" });
    }
};

const enviarDados = async (req,res) => {
    try {
        
        const {
            proposito_investimento,
            tipo_investimento,
            valor_aportado ,
            data_de_entrada,
            data_de_saida,
            valor_final
        } = req.body;

        const novoInvestimento = new Investimento({
            proposito_investimento: proposito_investimento,
            tipo_investimento: tipo_investimento,
            Valor_Aportado: mongoose.Types.Decimal128.fromString(valor_aportado.toString()),
            Data_de_Entrada: new Date(data_de_entrada),
            Data_de_Saida: data_de_saida ? new Date(data_de_saida) : null,
            Valor_Final: mongoose.Types.Decimal128.fromString(valor_final.toString()),
        });
        
        
          

        const investimentoSalvo = await db.useDb("InvestimentosDB").collection("Investimentos").insertOne(novoInvestimento);

        res.status(201).json({
            success: true,
            message: 'Investimento criado com sucesso!',
            investimento: investimentoSalvo,
        });
    } catch (erro) {
        console.log(`Erro encontrado ${erro}`)
    }
}

module.exports = {
    getAdmin,
    enviarDados
};
