const express = require('express');

const router = express.Router();

const { createNewTicket } = require('../controllers/tickets');

router.post('/', createNewTicket);

module.exports = router;
