// Importando o service
import userService from "../services/userService.js";

//Importando o JWT
import jwt from 'jsonwebtoken'

//Importando dotenv (variaveis de ambiente)
import dotenv from "dotenv"; 
dotenv.config(); //faz o dotenv procurar por um arquivo .env no seu projeto

//Segredo para o token
//É recomendado que o segredo esteja nas variaveis de ambiente (veremos futuramente)
const JWTSecret = process.env.JWTSECRET;

//Importando o Bcrypt para fazer o hash de senha
import bcrypt from "bcrypt"

// Função para cadastrar um usuário
const createUser = async (req, res) => {
    try {
        // Coletando os dados do corpo da requisição
        const { name, email, password } = req.body;

        //Verifica se o usuario já existe
        const user = await userService.getOne(email);
        //Se não houver usuario já cadastrado
        if(user == undefined){
            //Aqui sera feito o hash da senha
            const salt = bcrypt.genSaltSync(10) //salt é o valor numerico para deixar mais dificil quebrar a senha, maior é mais lento
            const hash = bcrypt.hashSync(password, salt) //password+salt gera o hash
            //Cadastrando o usuario
            await userService.create(name, email, hash);

            res.status(201).json({ success: 'Usuário cadastrado com sucesso' }); // Cod 201 Created

        }else{//se o usuario já existir/estiver cadastrado
            res.status(409).json({error: "O usuario informado já está cadastrado"}) //409 é codigo de conflito
        }

        
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
            //Comparando o hash de senha
            const correct = bcrypt.compareSync(password, user.password)
            //se a senha for valida
            if (correct){
                //gerando o token com JWT
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
