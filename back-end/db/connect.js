const mongoose = require("mongoose")


const connectDb = async (url) => {
    if (!url) {  
        throw new Error("URL de conexão com o MongoDB não foi fornecida." ); 
    } 
    try {
        await mongoose.connect(url);
        console.log("Conectado ao banco de dados!");
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error.message);
        throw error; // Lança o erro para ser capturado no `start()`
    }
};
module.exports = connectDb