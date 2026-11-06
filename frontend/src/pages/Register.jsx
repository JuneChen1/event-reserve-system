import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../api/auth';
import {
  validateConfirm,
  validateEmail,
  validateName,
  validateNewPassword
} from '../utils/validators';

function getErrors(form) {
  return {
    name: validateName(form.name),
    email: validateEmail(form.email),
    password: validateNewPassword(form.password),
    confirm: validateConfirm(form.password, form.confirm)
  };
}

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  // 離開欄位後才開始顯示錯誤，之後隨輸入即時更新
  const [touched, setTouched] = useState({});
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  // 同步上鎖，避免連點時在畫面更新前重複送出
  const submittingRef = useRef(false);

  const errors = getErrors(form);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleBlur(e) {
    setTouched({ ...touched, [e.target.name]: true });
  }

  function fieldError(name) {
    return touched[name] ? errors[name] : '';
  }

  function inputProps(name) {
    return {
      name,
      value: form[name],
      onChange: handleChange,
      onBlur: handleBlur,
      className: fieldError(name) ? 'invalid' : undefined
    };
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (submittingRef.current) return;
    setTouched({ name: true, email: true, password: true, confirm: true });
    if (Object.values(errors).some(Boolean)) return;

    submittingRef.current = true;
    setError('');
    setSubmitting(true);
    try {
      await register({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password
      });
      navigate('/login', { state: { registered: true } });
    } catch (err) {
      setError(err.message);
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  }

  return (
    <section className="card form-card">
      <h2>註冊</h2>
      {error && <p className="notice error">{error}</p>}
      <form onSubmit={handleSubmit} noValidate>
        <label>
          姓名
          <input type="text" autoComplete="name" {...inputProps('name')} />
          {fieldError('name') && <small className="field-error">{fieldError('name')}</small>}
        </label>
        <label>
          Email
          <input type="email" autoComplete="email" {...inputProps('email')} />
          {fieldError('email') && <small className="field-error">{fieldError('email')}</small>}
        </label>
        <label>
          密碼
          <input type="password" autoComplete="new-password" {...inputProps('password')} />
          {fieldError('password') ? (
            <small className="field-error">{fieldError('password')}</small>
          ) : (
            <small>8–16 碼，需包含大寫、小寫與數字，僅限英文與數字</small>
          )}
        </label>
        <label>
          確認密碼
          <input type="password" autoComplete="new-password" {...inputProps('confirm')} />
          {fieldError('confirm') && <small className="field-error">{fieldError('confirm')}</small>}
        </label>
        <button type="submit" className="btn" disabled={submitting}>
          {submitting ? '送出中…' : '註冊'}
        </button>
      </form>
      <p className="form-footer">
        已經有帳號？<Link to="/login">前往登入</Link>
      </p>
    </section>
  );
}
