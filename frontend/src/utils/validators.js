// 規則與後端 validUtils 一致
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,16}$/;

export const PASSWORD_RULE = '密碼需為 8–16 碼，包含大寫、小寫與數字，且只能使用英文與數字';

export function validateName(name) {
  return name.trim() ? '' : '請輸入姓名';
}

export function validateEmail(email) {
  const value = email.trim();
  if (!value) return '請輸入 Email';
  if (!EMAIL_REGEX.test(value)) return 'Email 格式不正確';
  return '';
}

export function validateNewPassword(password) {
  if (!password) return '請輸入密碼';
  if (!PASSWORD_REGEX.test(password)) return PASSWORD_RULE;
  return '';
}

export function validateConfirm(password, confirm) {
  if (!confirm) return '請再次輸入密碼';
  if (password !== confirm) return '兩次輸入的密碼不一致';
  return '';
}
