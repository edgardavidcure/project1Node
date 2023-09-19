const express = require('express');
const router = express.Router();

const usersControllers = require('../controllers/contacts');

router.get('/', usersControllers.getAll);
router.get('/:id', usersControllers.getSingle);

module.exports = router;
