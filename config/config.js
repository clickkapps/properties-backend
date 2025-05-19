// for the database migration
const dotenv = require('dotenv');

// Dynamically determine the environment
const env = process.env.NODE_ENV || 'development';
const envFile = env === 'production' ? '.env.production' : '.env';

dotenv.config({ path: envFile });
console.log(`Loaded environment from ${envFile}`);

module.exports = {
  "development": {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      ssl: {
        require: process.env.DB_SSL === 'true',
        rejectUnauthorized: false, // Accept self-signed certificates
        sslmode: process.env.DB_SSL_MODE || 'allow'
      }
    }
  },
}

