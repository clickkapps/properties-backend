import { Sequelize } from 'sequelize';

// This sets up a connection pool
const dbHost = process.env.DB_HOST || '';
const dbName = process.env.DB_DATABASE || '';
const dbUsername = process.env.DB_USERNAME || '';
const dbPassword = process.env.DB_PASSWORD || '';

const sequelize = new Sequelize( dbName, dbUsername, dbPassword, {
    host: dbHost,
    dialect: 'postgres',
})

export default sequelize;