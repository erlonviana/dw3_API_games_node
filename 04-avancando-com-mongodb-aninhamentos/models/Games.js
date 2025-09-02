import mongoose, { mongo } from "mongoose";

//criando um documento aninhado
const descriptionSchema = new mongoose.Schema({
    genre: String,
    platform: String,
    rating: String
})

const gameSchema = new mongoose.Schema({//estrutura de dados que vamos trabalhar
    title: String,
    // platform: String,
    // genre: String,
    year: Number,
    price: Number,
    descriptions: descriptionSchema
});

const Game = mongoose.model('Game', gameSchema); //no mongoDB vira "games" pois uma coleção é plural

export default Game;