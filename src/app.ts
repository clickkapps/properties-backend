import express, {NextFunction, Request, Response, Errback} from 'express'
import bodyParser from "body-parser";
import "dotenv/config";
import authRoutes from "./routes/auth.routes";
import session from "express-session";
import db from "./helpers/database"
import {isAuthenticated} from "./middlewares/auth.middleware";
import userRoutes from "./routes/user.routes";
import agentRoutes from "./routes/agent.routes";
import packageRoutes from "./routes/package.routes";
import {logIncomingRequests} from "./middlewares/monitor.middleware";
import {get404, get500} from "./controllers/errors.controller";
import {ApiResponse} from "./types/shared.types";

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

const allowedOrigins = ['http://localhost:5173',];

// Handling Cors Headers
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (origin && allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }
    res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept");
    next()
})

// app.use(logIncomingRequests)

// Authentication routes
app.use('/api/auth', authRoutes)
app.use('/api/user', isAuthenticated, userRoutes)
app.use('/api/agent', isAuthenticated, agentRoutes)
app.use('/api/package', packageRoutes)

app.get('api/', (req, res, next) => {
    res.status(200).json({ message: 'Service is running now!'})
})

app.get('/500', get500)

// Error Middleware
app.use(get500)

// any route other route
app.use('/', get404)

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
