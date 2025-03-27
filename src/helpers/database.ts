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
    models: [
        User, Package, PromotedProperty,
        Property, PropertyCategory, PropertyGallery,
        PropertySpecification, SubscribedPackage,
        Subscription, OTP
    ]
})

export default sequelize;