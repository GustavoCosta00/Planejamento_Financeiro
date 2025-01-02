const mongoose = require("mongoose");

const InvestimentoSchema = new mongoose.Schema({
    proposito_investimento: { type: String, required: true },
    tipo_investimento: { type: String, required: true },
    Valor_Aportado: { type: mongoose.Types.Decimal128, required: true },
    Data_de_Entrada: { type: Date, required: true },
    Data_de_Saida: { type: Date },
    Valor_Final: { type: mongoose.Types.Decimal128, required: true },
});

module.exports = mongoose.model("Investimento", InvestimentoSchema);
