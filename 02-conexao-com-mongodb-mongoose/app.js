import express from "express";
import mongoose, { connect } from 'mongoose';
const app = express();
import Game from "./models/Games.js"

//Configurações do express
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Iniciando a conexão como banco de dados mongodb
mongoose.connect("mongodb://127.0.0.1:27017/api-thegames")

//Criando um retorno da API
app.get("/", async (req,res)=>{
    try{
        const games = await Game.find()
        res.status(200).json({games: games})//Cod. 200 : ok, (Requisição bem-sucedida)

    }catch (error){
        console.log(error)
        res.status(500).json({error : 'Erro interno do servidor.'})
    }

});

//Rodando a API na porta 4000
const port = 4000;
app.listen(port,(error) =>{
    if (error) {
        console.log(error);
    }
    console.log(`API rodando em http://localhost:${port}`);
});