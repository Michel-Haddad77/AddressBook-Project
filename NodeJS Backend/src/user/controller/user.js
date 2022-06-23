const User = require("../../../models/User")

async function test(req,res){

    const result = await User.find();
    console.log('result =>', result);

    return res.send(result);
}

module.exports = {
    test
  };