import jwt from 'jsonwebtoken';
import userController from '../controllers/userController.js'; //precisa do userController pois ele tem o segredo do token

//Função de Autenticação para verificar se o usuario está enviando token e
//ele é válido

const Authorization = (req, res, next) => {
    const authToken = req.headers['authorization']//authorization é um campo padrão, aqui está gravado o token
    if (authToken != undefined){
        //O nosso tipo de token é Bearer (token portador), fica com o cliente
        //Dividindo a string do token (para eliminar a palavra Bearer)
        const bearer = authToken.split(" ")//cortar onde tiver um espaço, assim a palavra Bearer fica separada
        const token = bearer[1]
        //validando o token
        jwt.verify(token, userController.JWTSecret, (error, data) => {
            if (error){
                res.status(401).json({error: "Token inválido"})//token não foi validado
            } else {
                req.token = token;
                req.loggedUser = {
                    id: data.id,
                    email: data.email,
                };
                next() //next permite a passagem para o proximo passo da requisição
            }
        });        
    } else {
        res.status(401).json({error: "Acesso não-autorizado. Token invalido"});//caso token esteja vazio
    }
};

export default { Authorization };