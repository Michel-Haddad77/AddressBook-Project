const { Router } = require('express');
const { register } = require('./controller/user');

const router = Router();


router.get('/', register);

module.exports = router;