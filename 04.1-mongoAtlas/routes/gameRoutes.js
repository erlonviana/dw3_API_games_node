import express from "express";
const gameRoutes = express.Router();
import gameController from "../controllers/gameController.js";

//A camada de routes será responsável por contes os ENDPOINTS (rotas) da API

//ENDPOINT para listar
gameRoutes.get("/games", gameController.getAllgames)

//ENDPOINT para CADASTRAR
gameRoutes.post("/games", gameController.createGame) //a rota /games é a mesma mas vai diferenciar pela requisição (método recebido)

//ENDPOINT para deletar
gameRoutes.delete("/games/:id", gameController.deleteGame)

//ENDPOINT para alterar
gameRoutes.put("/games/:id", gameController.updateGame) //#########

//Endpoint para listar um unico jogo
gameRoutes.get("/games/:id", gameController.getOneGame) //parametro não-obrigatório ficaria assim: id?

export default gameRoutes;