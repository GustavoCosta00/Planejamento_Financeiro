const mongoose = require("mongoose");

const db = mongoose.connection

const getDespesas = async (req,res) => {
   res.send("tela para mostrar suas despesas")
}

module.exports = {
    getDespesas
}