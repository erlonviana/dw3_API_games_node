import User from "../models/Users.js";

class userService{
    //Método para cadastrar usuario
    async create(name, email, password){
        try{
            const newUser = new User({
                name,
                email,
                password,
            });
            await newUser.save();
        } catch(error){
            console.log(error)
        }
    }

    //Metodo para buscar um usuario
    async getOne(email) {
        try{
            const user = await User.findOne({ email : email});
            return user;
        } catch (error) {
            console.log(error);
        }
    }

}

export default new userService();