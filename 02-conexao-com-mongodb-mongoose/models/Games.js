import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({//estrutura de dados que vamos trabalhar
    title: String,
    platform: String,
    genre: String,
    year: Number,
    price: Number,
})

const Game = mongoose.model('Game', gameSchema); //no mongoDB vira "games" pois uma coleção é plural

export default Game;