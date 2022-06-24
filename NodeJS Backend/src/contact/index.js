const { Router } = require('express');
const { addContact, getContacts, deleteContact, updateContact } = require('./controller/contact');

const router = Router();

router.post('/add_contact', addContact);
router.get('/get_contacts', getContacts);
router.delete('/delete_contact', deleteContact);
router.put('/update_contact', updateContact);

module.exports = router;