import express from "express";
import mongoose, { connect } from 'mongoose';
const app = express();
import Game from "./models/Games.js";

//importando rotas
import gameRoutes from "./routes/gameRoutes.js";

//Configurações do express
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/', gameRoutes)

//Iniciando a conexão como banco de dados mongodb
mongoose.connect("mongodb://127.0.0.1:27017/api-thegames")

//A rota Criando um retorno da API foi apagada pois está em services


//Rodando a API na porta 4000
const port = 4000;
app.listen(port,(error) =>{
    if (error) {
        console.log(error);
    }
    console.log(`API rodando em http://localhost:${port}`);
});