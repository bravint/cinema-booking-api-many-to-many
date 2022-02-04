const express = require('express');

const router = express.Router();

const { createNewTicket } = require('../controllers/ticket');

router.post('/', createNewTicket);

module.exports = router;
