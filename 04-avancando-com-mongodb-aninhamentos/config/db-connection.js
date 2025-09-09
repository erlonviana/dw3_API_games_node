// Importando Mongoose
import mongoose from "mongoose";

// Usuário e senha do banco de dados
const dbUser = "erlonsantos3_db_user";
const dbPassword = "oRVhTG5tnRrJPhwO";

const connect = () => {
    mongoose.connect(
        `mongodb+srv://${dbUser}:${dbPassword}@cluster0.dj5ym59.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );

    const connection = mongoose.connection;

    connection.on("error", () => {
        console.log("Erro ao conectar com o MongoDB");
    });

    connection.once("open", () => {
        console.log("Conectado ao MongoDB com sucesso!");
    });
};

connect();

export default mongoose;
