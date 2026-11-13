const jwt = require('jsonwebtoken');
const { dataSource } = require('../db/data-source');
const appError = require('../utils/appError');

async function isAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      next(appError('UNAUTHORIZED', 401));
      return;
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userRepo = dataSource.getRepository('User');
    const user = await userRepo.findOneBy({ id: decoded.id });
    if (!user) {
      return next(appError('UNAUTHORIZED', 401));
    }
    const { password, ...safeUser } = user;
    req.user = safeUser;

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return next(
        appError('UNAUTHORIZED', 401, { message: '登入已過期，請重新登入' })
      );
    }
    if (error.name === 'JsonWebTokenError') {
      return next(appError('UNAUTHORIZED', 401));
    }
    next(error);
  }
}

module.exports = isAuth;
