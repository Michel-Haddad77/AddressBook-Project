const { Router } = require('express');
const { addContact, getContacts, deleteContact, updateContact } = require('./controller/contact');
const JWTMiddleware = require('../../middleware/JWTValidation');

const router = Router();

router.post('/add_contact',  JWTMiddleware(), addContact);
router.get('/get_contacts', JWTMiddleware(), getContacts);
router.delete('/delete_contact', JWTMiddleware(), deleteContact);
router.put('/update_contact', JWTMiddleware(), updateContact);

module.exports = router;