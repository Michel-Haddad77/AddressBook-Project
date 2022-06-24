const { Router } = require('express');
const { addContact, getContacts } = require('./controller/contact');

const router = Router();

router.post('/add_contact', addContact);
router.post('/get_contacts', getContacts);

module.exports = router;