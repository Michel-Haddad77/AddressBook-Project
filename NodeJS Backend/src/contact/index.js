const { Router } = require('express');
const { addContact } = require('./controller/contact');

const router = Router();

router.post('/add_contact', addContact);

module.exports = router;