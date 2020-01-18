require('dotenv').config({
  path: './.env.prod'
});

module.exports = {
  'migrationDirectory': 'migrations',
  'driver': 'pg',
  'connectionString': process.env.DATABASE_URL,
  'ssl': true,
};