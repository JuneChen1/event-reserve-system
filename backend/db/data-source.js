require('dotenv').config();
const path = require('path');

const { DataSource } = require('typeorm');

const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === 'true',
  synchronize: false,
  poolSize: 10,
  entities: [path.join(__dirname, '../entities/*.js')],
  migrations: [path.join(__dirname, 'migrations/*.js')]
});

module.exports = { dataSource };
