require('dotenv').config();

const bcrypt = require('bcryptjs');
const { dataSource } = require('../data-source');
const {
  isValidString,
  isValidPassword,
  isValidEmail
} = require('../../utils/validUtils');

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const name = process.env.ADMIN_NAME;
  const password = process.env.ADMIN_PASSWORD;

  if (
    !isValidEmail(email) ||
    !isValidString(name) ||
    !isValidPassword(password)
  ) {
    throw new Error(
      '環境變數 (ADMIN_EMAIL、ADMIN_NAME、ADMIN_PASSWORD) 未設定或格式不符'
    );
  }

  await dataSource.initialize();

  try {
    const userRepo = dataSource.getRepository('User');
    const user = await userRepo.findOneBy({
      email: email.trim().toLowerCase()
    });

    if (user) {
      await userRepo.save({
        ...user,
        name: name.trim(),
        role: 'ADMIN'
      });
      console.log(`已將既有帳號「${name}」的權限設為 ADMIN（密碼未變更）`);
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      await userRepo.save({
        name: name.trim(),
        password: hashedPassword,
        email: email.trim().toLowerCase(),
        role: 'ADMIN'
      });
      console.log(`已建立管理者帳號「${name}」`);
    }
  } finally {
    await dataSource.destroy();
  }
}

seedAdmin().catch((error) => {
  console.error('管理者帳號 seed 失敗：', error);
  process.exit(1);
});
