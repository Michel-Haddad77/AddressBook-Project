const User = require("../../../models/User");
const bcrypt = require('bcryptjs');

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

        //create new user document
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

module.exports = {
    register
  };