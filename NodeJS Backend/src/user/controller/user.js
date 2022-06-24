const User = require("../../../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const TOKEN_SECRET = process.env.TOKEN_SECRET || "";

//register API
async function register(req,res){
    try{
        console.log(req.body); //body is a raw JSON file

        //get name and email from request body
        const {
            name,
            email,
        } = req.body;

        //encrypt the password and add salt
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        //create new user document from mongoose model
        const user = new User({
            name,
            email,
            password: hashPassword
        });

        //save user document in db
        const added_user = await user.save();

        console.log('addUserResult =>', user); //or added_user
        return res.send(user);
        
    }catch(error){
        console.log(error);
    }   
}

//login API
async function login(req,res){
    try{
        const {
            email,
            password
        } = req.body;

        //check if email exists
        const user = await User.findOne({email});
        if (!user) return res.status(400).send("Incorrect Email");

        //check if password matches
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).send("Incorrect Password");

        //create jwt token and send it in response
        const token = jwt.sign(
            {_id:user._id, name: user.name, email: user.email}, TOKEN_SECRET
        );

        return res.header('auth-token',token).send(token);

    } catch(error){
        console.log(error);
    }
}

module.exports = {
    register,
    login
  };