import express from 'express'
const userRoutes = express.Router();
import userController from '../controllers/userController.js';

//Rota para cadastrar um usuario
userRoutes.post("/user", userController.createUser);

//Rota para logar um usuario
userRoutes.post("/login", userController.loginUser);


export default userRoutes;