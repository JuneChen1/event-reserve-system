import { useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validateEmail } from '../utils/validators';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  // 離開欄位後才開始顯示錯誤，之後隨輸入即時更新
  const [touched, setTouched] = useState({});
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  // 同步上鎖，避免連點時在畫面更新前重複送出
  const submittingRef = useRef(false);

  // 登入不檢查密碼格式，只要求有填
  const errors = {
    email: validateEmail(form.email),
    password: form.password ? '' : '請輸入密碼'
  };

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    // 開始修改後就先收起上一次的登入失敗訊息
    if (error) setError('');
  }

  function handleBlur(e) {
    setTouched({ ...touched, [e.target.name]: true });
  }

  function fieldError(name) {
    return touched[name] ? errors[name] : '';
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (submittingRef.current) return;
    setTouched({ email: true, password: true });
    if (errors.email || errors.password) return;

    submittingRef.current = true;
    setError('');
    setSubmitting(true);
    try {
      await login({ email: form.email.trim(), password: form.password });
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  }

  return (
    <section className="card form-card">
      <h2>登入</h2>
      {location.state?.registered && !error && (
        <p className="notice success">註冊成功，請登入</p>
      )}
      {error && <p className="notice error">{error}</p>}
      <form onSubmit={handleSubmit} noValidate>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={fieldError('email') ? 'invalid' : undefined}
            autoComplete="email"
          />
          {fieldError('email') && <small className="field-error">{fieldError('email')}</small>}
        </label>
        <label>
          密碼
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={fieldError('password') ? 'invalid' : undefined}
            autoComplete="current-password"
          />
          {fieldError('password') && (
            <small className="field-error">{fieldError('password')}</small>
          )}
        </label>
        <button type="submit" className="btn" disabled={submitting}>
          {submitting ? '登入中…' : '登入'}
        </button>
      </form>
      <p className="form-footer">
        還沒有帳號？<Link to="/register">前往註冊</Link>
      </p>
    </section>
  );
}
