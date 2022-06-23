const { Router } = require('express');
const { test } = require('./controller/user');

const router = Router();


router.get('/', test);

module.exports = router;