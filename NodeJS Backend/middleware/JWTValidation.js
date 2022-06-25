const TOKEN_SECRET = process.env.TOKEN_SECRET || "";
const jwt = require('jsonwebtoken');

function JWTMiddleware(){
    return (req,res,next)=>{
        //get token from authorization header
        const token = req.headers.authorization;
       
        try{
            const verified = jwt.verify(token, TOKEN_SECRET);
            //check if verified token id is the same as the user id in url params
            if(verified._id === req.query.id){
                next();
            }else{
                return res.status(401).send("Unauthorized Token");
            }

        }catch(error){
            console.log(error);
            res.status(401).send("Invalid Token");
        }
    }
}

module.exports = JWTMiddleware;