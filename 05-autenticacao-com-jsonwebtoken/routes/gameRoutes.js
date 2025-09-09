import express from "express";
const gameRoutes = express.Router();
import gameController from "../controllers/gameController.js";

//Importando o middleware
import Auth from "../middleware/Auth.js";

//A camada de routes será responsável por contes os ENDPOINTS (rotas) da API

//ENDPOINT para listar
gameRoutes.get("/games", Auth.Authorization, gameController.getAllgames)

//ENDPOINT para CADASTRAR
gameRoutes.post("/games", Auth.Authorization, gameController.createGame) //a rota /games é a mesma mas vai diferenciar pela requisição (método recebido)

//ENDPOINT para deletar
gameRoutes.delete("/games/:id", Auth.Authorization, gameController.deleteGame)

//ENDPOINT para alterar
gameRoutes.put("/games/:id", Auth.Authorization, gameController.updateGame) //#########

//Endpoint para listar um unico jogo
gameRoutes.get("/games/:id", Auth.Authorization, gameController.getOneGame) //parametro não-obrigatório ficaria assim: id?

export default gameRoutes;