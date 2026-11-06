import { useAuth } from '../context/AuthContext';

// 暫時的首頁，之後由前台同學換成餐廳列表
export default function Home() {
  const { user, loading } = useAuth();

  if (loading) return <p>載入中…</p>;

  return (
    <section className="card">
      <h2>歡迎來到餐廳訂位系統</h2>
      {user ? (
        <p>
          你好，{user.name}（{user.role === 'ADMIN' ? '管理者' : '會員'}）
        </p>
      ) : (
        <p>請先登入或註冊會員。</p>
      )}
    </section>
  );
}
