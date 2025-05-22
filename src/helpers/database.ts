import { Sequelize } from '@sequelize/core';
import User from "../models/User";
import Package from "../models/Package";
import PromotedProperty from "../models/PromotedProperty";
import Property from "../models/Property";
import PropertyCategory from "../models/PropertyCategory";
import PropertyGallery from "../models/PropertyGallery";
import PropertySpecification from "../models/PropertySpecification";
import SubscribedPackage from "../models/SubscribedPackage";
import Subscription from "../models/Subscription";
import OTP from "../models/OTP";
import {PostgresDialect} from "@sequelize/postgres";
import UserEntitlement from "../models/UserEntitlement";
import Advertisement from "../models/Advertisement";
import PasswordAttempt from "../models/PasswordAttempt";
import PropertyShowing from "../models/PropertyShowing";
import fs from 'fs';

const inProductionMode = process.env.NODE_ENV === 'production';

const dbHost = process.env.DB_HOST || '';
const dbName = process.env.DB_NAME || '';
const dbUsername = process.env.DB_USERNAME || '';
const dbPassword = process.env.DB_PASSWORD || '';
const dbPort = process.env.DB_PORT;

const sslPath = process.env.DB_CERT_PATH
// console.log("inProductionMode", inProductionMode, "sslPath", sslPath)

// !IMPORTANT FRO PRODUCTION. Trust only AWS RDS certificate
let sslConfig = undefined
try {
    if (inProductionMode && sslPath) {
        sslConfig = {
            rejectUnauthorized: true,
            ca: fs.readFileSync(sslPath).toString(), // trust only amazon certificate
        }
    }
}catch (e) {
    console.log("customLog", "error reading from sslPath", e )
}


const sequelize = new Sequelize({
    dialect: PostgresDialect,
    database: dbName,
    user: dbUsername,
    password: dbPassword,
    host: dbHost,
    port: parseInt(dbPort || '5432', 10),
    logging: inProductionMode ? undefined : console.log, // Enable SQL query logging
    ssl:   inProductionMode ? sslConfig  : false,
    models: [
        User, Package, PromotedProperty,
        Property, PropertyCategory, PropertyGallery,
        PropertySpecification, SubscribedPackage,
        Subscription, OTP, UserEntitlement, Advertisement,
        PasswordAttempt, PropertyShowing
    ]
})

// ✅ default scope is called automatically on User.find() etc
// User.addScope('defaultScope', {
//     attributes: { exclude: [ ...User.sensitiveProperties ] },
// });

User.addScope('excludeSensitive', {
    attributes: { exclude: User.sensitiveProperties },
});

export default sequelize;