const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const porta = process.env.PORT || 5000;
const connectDb = require("./db/connect");
const corsOptions = {
    origin: 'http://localhost:5173', // Frontend rodando nessa URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
};

require('dotenv').config();
const app = express();

// Importando rotas
const acesso = require("./router/acesso");
const admin = require("./router/admin");
const investimento = require("./router/investimento");

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })); 


// Adicionando os roteadores ao app
app.use('/', acesso);
app.use('/admin' , admin);

// Iniciar o servidor
const start = async () => {
    try {
        await connectDb(process.env.MONGO_URL);
        app.listen(porta, () => {
            console.log(` SERVIDOR RODANDO NA PORTA ${porta}`);
        });
    } catch (error) {
        console.log("Aconteceu um erro -> " + error);
    }
};

start();
