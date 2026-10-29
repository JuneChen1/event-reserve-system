const express = require('express');
const isAuth = require('../middlewares/isAuth');
const isAdmin = require('../middlewares/isAdmin');
const router = express.Router();

router.use(isAuth, isAdmin);

module.exports = router;
