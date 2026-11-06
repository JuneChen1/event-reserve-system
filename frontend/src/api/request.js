const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const TOKEN_KEY = 'token';

// 後端失敗格式：{ success: false, errorCode, message }
export class ApiError extends Error {
  constructor(status, errorCode, message) {
    super(message);
    this.status = status;
    this.errorCode = errorCode;
  }
}

export async function request(path, { method = 'GET', body } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) headers.Authorization = `Bearer ${token}`;

  let res;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined
    });
  } catch {
    throw new ApiError(0, 'NETWORK_ERROR', '無法連線到伺服器，請稍後再試');
  }

  let json = null;
  try {
    json = await res.json();
  } catch {
    // 回應不是 JSON
  }

  if (!res.ok || !json?.success) {
    throw new ApiError(
      res.status,
      json?.errorCode || 'UNKNOWN_ERROR',
      json?.message || '發生未知錯誤，請稍後再試'
    );
  }
  return json.data;
}
