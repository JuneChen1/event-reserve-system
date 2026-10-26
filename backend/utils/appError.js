const errors = require('../config/errorCodes');

// 用法：appError('VALIDATION_ERROR', 400)
// 需要覆寫時：appError('VALIDATION_ERROR', 400, { message: 'Email 格式錯誤' })
function appError(errorCode, statusCode, overrides = {}) {
  const defaultMessage = errors[errorCode];
  if (!defaultMessage) throw new Error(`未定義的錯誤碼：${errorCode}`);

  const error = new Error(overrides.message ?? defaultMessage);
  error.statusCode = statusCode;
  error.errorCode = errorCode;
  error.isOperational = true;
  return error;
}

module.exports = appError;
