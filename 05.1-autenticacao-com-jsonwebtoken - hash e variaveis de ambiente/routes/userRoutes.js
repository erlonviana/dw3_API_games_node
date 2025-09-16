import express from 'express'
const userRoutes = express.Router();
import userController from '../controllers/userController.js';

//ENDPOINT (ROTA) para cadastrar um usuario
userRoutes.post("/user", userController.createUser);

//ENDPOINT (ROTA) para logar um usuario
userRoutes.post("/login", userController.loginUser);


export default userRoutes;