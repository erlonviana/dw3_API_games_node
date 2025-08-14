import express from "express";
const app = express()

//Configurações do express
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Criando um retorno da API
app.get("/", (req,res)=>{
    const games = [
        {
            title: "Delta",
            year: 2024,
            genre: "FPS",
            platform: "PC (Windows)",
            price: 0
        },
        {
            title: "Diablo III",
            year: 2012,
            genre: "RPG",
            platform: "PC (Windows)",
            price: 0
        },
        {
            title: "League of Legends",
            year: 2009,
            genre: "MOBA",
            platform: "PC (Windows)",
            price: 0
        }
    ];
    res.json(games);//api vai retornar o JSON de jogos
})

//Rodando a API na porta 4000
const port = 4000;
app.listen(port,(error) =>{
    if (error) {
        console.log(error);
    }
    console.log(`API rodando em http://localhost:${port}`);
});