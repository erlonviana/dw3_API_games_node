import Game from "../models/Games.js"; //importa os models

//O service será responsável por conter os metodos de manipulação do banco

class gameService {
  //classe
  //Buscando os registros do banco (listar)
  async getAll() {
    //método
    try {
      const games = await Game.find();
      return games; //vai retornar um array
    } catch (error) {
      console.log(error);
    }
  }
  //Cadastrando registros no banco
  async Create(title, year, genre, platform, price) {
    try {
      const newGame = new Game({
        //criando uma instância de game para inserir esse objeto no BD
        title, //não precisa digitar title: title, etc etc
        year,
        genre,
        platform,
        price,
      });
      await newGame.save();
    } catch (error) {
      console.log(error);
    }
  }

  //deletando registros no banco
  async Delete(id) {
    try {
      await Game.findByIdAndDelete(id);
      console.log(`Game com a id: {id} foi deletado com sucesso.`)
    } catch (error) {
      console.log(error);
    }
  }

  //alterando registros no banco
  async Update(id, title, year, genre, platform, price){
    try{
      await Game.findByIdAndUpdate(id, {
        title, 
        year,
        genre,
        platform,
        price
      });
      console.log(`Dados do game id ${id} alterados com sucesso`)
    } catch(error){
      console.log(error);
    }
  }
}
export default new gameService();
