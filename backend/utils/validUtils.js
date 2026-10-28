module.exports = {
  isValidString(value) {
    return typeof value === 'string' && value.trim() !== '';
  },

  isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return typeof email === 'string' && emailRegex.test(email.trim());
  },

  // 8–16 碼，須含大寫、小寫、數字，僅限英數字
  isValidPassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,16}$/;

    return typeof password === 'string' && passwordRegex.test(password);
  }
};
