import { Sequelize } from '@sequelize/core';
import { PostgresDialect } from '@sequelize/postgres';
import UserModel from "../models/user.model";

// This sets up a connection pool
const dbHost = process.env.DB_HOST || '';
const dbName = process.env.DB_NAME || '';
const dbUsername = process.env.DB_USERNAME || '';
const dbPassword = process.env.DB_PASSWORD || '';

const sequelize = new Sequelize({
    dialect: PostgresDialect,
    database: dbName,
    user: dbUsername,
    password: dbPassword,
    host: dbHost,
//     ssl: true,
//   clientMinMessages: 'notice',
    models: [UserModel]
})

export default sequelize;