require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { dataSource } = require('./db/data-source');

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res) => {
  res
    .status(404)
    .json({ success: false, errorCode: 'NOT_FOUND', message: '找不到此路由' });
});

app.use((err, req, res, next) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      success: false,
      errorCode: err.errorCode,
      message: err.message
    });
  }

  console.error(err);
  res.status(500).json({
    success: false,
    errorCode: 'SERVER_ERROR',
    message: '伺服器錯誤'
  });
});

dataSource
  .initialize()
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('資料庫連線失敗', error);
    process.exit(1);
  });
