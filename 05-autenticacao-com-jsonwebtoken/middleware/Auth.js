import jwt from 'jsonwebtoken';
import userController from '../controllers/userController.js'; //precisa do userController pois ele tem o segredo do token

//Função de Autenticação para verificar se o usuario está enviando token e
//ele é válido

const Authorization = (req, res, next) => {
    const authToken = req.headers['authorization']//authorization é um campo padrão
    if (authToken != undefined){
        next()
    } else {
        res.status(401).json({error: "Token invalido"});
    }
};

export default { Authorization };