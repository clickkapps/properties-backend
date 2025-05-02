import express from 'express'
import bodyParser from "body-parser";
import "dotenv/config";
import authRoutes from "./routes/auth.routes";
import session from "express-session";
import db from "./helpers/database"
import {isAuthenticated} from "./middlewares/auth.middleware";
import userRoutes from "./routes/user.routes";
import agentRoutes from "./routes/agent.routes";
import packageRoutes from "./routes/package.routes";
import {get404, get500} from "./controllers/errors.controller";
import propertyRoutes from "./routes/property.routes";
import subscriptionRoutes from "./routes/subscription.routes";
import {logIncomingRequests} from "./middlewares/monitor.middleware";
import cors, {CorsOptions} from "cors";
import adRoutes from "./routes/ad.routes";

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


let whitelist = ['http://localhost:5173']

const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        console.log("origin", origin)
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
};

app.use(cors(corsOptions))

app.use(logIncomingRequests)

app.use('/api/auth', authRoutes)
app.use('/api/users', isAuthenticated, userRoutes)
app.use('/api/packages', packageRoutes)
app.use('/api/properties', propertyRoutes )
app.use('/api/subscription', subscriptionRoutes )
app.use('/api/advertisements', adRoutes )

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
