const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { dataSource } = require('../db/data-source');
const appError = require('../utils/appError');
const {
  isValidString,
  isValidEmail,
  isValidPassword
} = require('../utils/validUtils');

const authController = {
  async register(req, res, next) {
    const { email, name, password } = req.body ?? {};
    if (
      !isValidEmail(email) ||
      !isValidString(name) ||
      !isValidPassword(password)
    )
      return next(appError('VALIDATION_ERROR', 400));

    try {
      const userRepo = dataSource.getRepository('User');
      const existing = await userRepo.findOneBy({
        email: email.trim().toLowerCase()
      });
      if (existing) {
        return next(appError('EMAIL_TAKEN', 409));
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await userRepo.save({
        email: email.trim().toLowerCase(),
        name: name.trim(),
        password: hashedPassword,
        role: 'USER'
      });

      res.status(201).json({
        success: true,
        data: {
          user: {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
            role: newUser.role
          }
        }
      });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = authController;
