import Game from "../models/Games.js"; // importa os models

// O service será responsável por conter os métodos de manipulação do banco

class gameService {
  // classe

  // Buscando os registros do banco (listar)
  async getAll() {
    // método
    try {
      const games = await Game.find();
      return games; // vai retornar um array
    } catch (error) {
      console.log(error);
    }
  }

  // Cadastrando registros no banco
  async Create(title, year, price, descriptions) {
    try {
      const newGame = new Game({
        // criando uma instância de game para inserir esse objeto no BD
        title, // não precisa digitar title: title, etc
        year,
        price,
        descriptions,
      });
      await newGame.save();
    } catch (error) {
      console.log(error);
    }
  }

  // Deletando registros no banco
  async Delete(id) {
    try {
      await Game.findByIdAndDelete(id);
      console.log(`Game com a id: ${id} foi deletado com sucesso.`);
    } catch (error) {
      console.log(error);
    }
  }

  // Alterando registros no banco
  async Update(id, title, year, price, descriptions) { // <-- corrigido
    try {
      const game = await Game.findByIdAndUpdate(
        id,
        {
          // game é uma variável que recebe a alteração
          title,
          year,
          price,
          descriptions,
        },
        { new: true } // após alterar, vai gerar um registro atualizado
      );
      console.log(`Dados do game id ${id} alterados com sucesso`);
      return game; // retorna o game alterado
    } catch (error) {
      console.log(error);
    }
  }

  // Listando um registro único
  async getOne(id) {
    try {
      const game = await Game.findOne({ _id: id }); // no mongoDB o campo id começa com underline _id
      return game;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new gameService();
