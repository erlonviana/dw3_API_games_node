// Importando o service
import userService from "../services/userService.js";

//Importando o JWT
import jwt from 'jsonwebtoken'
//Segredo para o token
//É recomendado que o segredo esteja nas variaveis de ambiente (veremos futuramente)
const JWTSecret = 'apithegames'

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
        const {email, password} = req.body;
        //buscando o usuario pelo email
        const user = await userService.getOne(email);
        //Se o usuario for encontrado
        if (user != undefined) {
            //validando a senha correta
            if (user.password == password){
                //gerando o token
                jwt.sign({id: user.id, email: user.email}, JWTSecret, {expiresIn: '48h'}, //token expira em 2 dias
                //se der erro, salva na variavel error; se der certo, salva na variavel token
                (error, token) => {
                    if(error){
                        res.status(400).json({error: 'Não foi possível gerar o token de autenticação'})
                    } else{
                        //token gerado com sucesso
                        res.status(200).json({token})
                    }
                }
                )
                //senha incorreta
            } else {
                //COD.401: Unauthorized
                res.status(401).json({error: 'Credenciais invalidas'})
            }
            //res.status(200).json ({ success: "Login efetuado com sucesso"}); //se usuario estiver cadastrado, ok
        } else {
            res.status(404).json({ error : "Usuario não encontrado"})
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export default { createUser, loginUser, JWTSecret };
