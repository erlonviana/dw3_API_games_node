import gameService from "../services/gameService.js";
import { ObjectId } from "mongodb";

// controller só vai tratar as requisições, não mais as rotas (rotas apenas no routes)

// função para listar jogos
const getAllgames = async (req, res) => {
  try {
    const games = await gameService.getAll();
    // cód. 200 (ok) - Requisição feita com sucesso
    res.status(200).json({ games: games });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

// função para cadastrar jogos
const createGame = async (req, res) => {
  try {
    // const title = req.body.title
    // const year = req.body.year
    // const genre = req.body.genre
    // const platform = req.body.platform
    // const price = req.body.price

    const { title, year, genre, platform, price } = req.body;
    await gameService.Create(title, year, genre, platform, price);
    res.sendStatus(201); // Codigo 201 (CREATED) : Recurso criado 
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// Função para deletar jogos
const deleteGame = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      await gameService.Delete(id);
      res.sendStatus(204); 
      // código 204 (NO CONTENT) - requisição bem-sucedida mas não há conteúdo para retornar
    } else { 
      // Se o ID não for válido
      res.status(400).json({ error: "A ID enviada é inválida" });
      // código 400 (BAD Request) - requisição mal formada
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor" });

    // res.status(500).json({}) -> Para enviar json junto
    // res.sendStatus(500) -> Somente código de status
  }
};

// função para alterar jogos
const updateGame = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      const { title, year, genre, platform, price } = req.body;
      await gameService.Update(id, title, year, genre, platform, price);
      res.sendStatus(200); // Codigo 200 - ok
    } else {
      res.sendStatus(400); // Codigo 400 Bad Request
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export default { getAllgames, createGame, deleteGame, updateGame };