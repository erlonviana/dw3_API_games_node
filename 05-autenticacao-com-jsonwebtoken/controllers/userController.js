// Importando o service
import userService from "../services/userService.js";

// Função para cadastrar um usuário
const createUser = async (req, res) => {
    try {
        // Coletando os dados do corpo da requisição
        const { name, email, password } = req.body;

        await userService.create(name, email, password);

        res.status(201).json({ success: 'Usuário cadastrado com sucesso' }); // Cod 201 Created
    } catch (error) {
        console.log(error);
        res.sendStatus(500); // Erro interno do servidor
    }
};

//Função para realizar o login
const loginUser = async(req,res) => {
    try{
        const {email, password} = req.body
        const user = await userService.getOne(email)
        if (user != undefined) {
            res.status(200).json ({ success: "Login efetuado com sucesso"}); //se usuario estiver cadastrado, ok
        } else {
            res.status(404).json({ error : "Usuario não encontrado"})
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export default { createUser, loginUser };
