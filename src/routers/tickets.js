const express = require('express');

const router = express.Router();

const {} = require('../controllers/tickets');

router.post('/ticket', createNewTicket);

module.exports = router;
