const express = require('express');

const router = express.Router();

const { getScreenById } = require('../controllers/screen');

router.get('/:id', getScreenById);

module.exports = router;