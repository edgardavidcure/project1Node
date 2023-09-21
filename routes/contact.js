const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');

router.get('/', contactsController.getAllContacts);
router.get('/:id', contactsController.getSingleContact);
router.put('/:id', contactsController.updateSingleContact);
router.post('/', contactsController.addContact);
router.delete('/:id', contactsController.deleteSingleContact);
router.delete('/', contactsController.deleteAllContacts);

module.exports = router;
