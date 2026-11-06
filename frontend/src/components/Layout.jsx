import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <Link to="/" className="brand">
            餐廳訂位系統
          </Link>
          <nav className="nav">
            <NavLink to="/" end>
              首頁
            </NavLink>
            {user ? (
              <>
                <span className="nav-user">{user.name}</span>
                <button type="button" className="nav-button" onClick={handleLogout}>
                  登出
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login">登入</NavLink>
                <NavLink to="/register">註冊</NavLink>
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="container main">
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="container">© 餐廳訂位系統</div>
      </footer>
    </>
  );
}
