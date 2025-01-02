const mongoose = require("mongoose");

const db = mongoose.connection

const getInvestimento = async (req,res, next) => {
    try{
        const resultado = await db.useDb('PF').collection('Investimentos').find({}).toArray()
        res.json({resultado})
        console.log(resultado)
        next()
    } catch(erro){
        console.log(`Aconteceu um erro ${erro}`)
    }
    next()
}


module.exports = {
    getInvestimento,
}