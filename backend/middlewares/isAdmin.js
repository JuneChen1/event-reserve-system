const appError = require('../utils/appError');

function isAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'ADMIN') {
    return next(appError('FORBIDDEN', 403));
  }
  next();
}

module.exports = isAdmin;
