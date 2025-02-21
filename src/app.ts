import express from 'express'
import bodyParser from "body-parser";
import "dotenv/config";
import authRoutes from "./routes/auth.routes.js";
import session from "express-session";
import db from "./utils/database.js"

const app = express()
app.use(bodyParser.json())

const sessionConfig = {
    secret: process.env['GOOGLE_SESSION_KEY'] || 'example-secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}
if (process.env['APP_ENV'] === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sessionConfig.cookie.secure = true // serve secure cookies
}

app.use(session(sessionConfig))

// Handling Cors Headers
app.use((_, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", 'localhost:3000, localhost:5000');
    res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept");
    next()
})

// Authentication routes
app.use('/auth', authRoutes)

app.get('/', (req, res, next) => {
    res.status(200).json({ message: 'Service is running now!'})
})

// database connection
db.authenticate()
.then(() => {
    console.log("Connection to the database has been established successfully.");
    // return User.create({ })
}).then((result) => {
    // console.log("inserted result - ", result);
    app.listen(3000, () => {
        console.log('Server running on port 3000')
    })
})
.catch((err: any) => {
    console.error(err.message);
});
