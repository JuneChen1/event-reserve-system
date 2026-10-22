const express = require('express');
const cors = require('cors');

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
