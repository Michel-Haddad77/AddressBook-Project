const { Router } = require('express');
const User = require('../../models/User');

const router = Router();

//routing test
router.get('/', async (req,res)=>{
    try{
        const result = await User.find();
        console.log('result =>', result);

        return res.send(result);
    }catch (error) {
        console.log(error);
    }
});

module.exports = router;