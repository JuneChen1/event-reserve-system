const express = require('express');
const authController = require('../controllers/auth');
const isAuth = require('../middlewares/isAuth');
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', isAuth, authController.getMe);

module.exports = router;
