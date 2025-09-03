import express from 'express'
import dotenv from "dotenv";
dotenv.config()
// dotenv.config({ path: ['.env.production'] })

import bodyParser from "body-parser";
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
import throttleMiddleware from "./middlewares/throttle.middleware";
import showingsRoutes from "./routes/showings.routes";
import {RedisStore} from "connect-redis"
import Redis from 'ioredis';
import systemUserRoutes from "./routes/system.user.routes";

const apiVersion = '1.0.18'

// dotenv.config({ path: path.resolve(process.cwd(), '.env') } ) //to switch to production from local environment add
console.log("configs", {
    environment: process.env['NODE_ENV'],
    version: apiVersion
})
const inProductionMode = process.env['NODE_ENV'] === 'production'

const app = express()
app.use(bodyParser.json())

// locally start redis container with
// docker run -p 6379:6379 -d --name redis-container redis

let redisStore: RedisStore | undefined

if(inProductionMode) {

    const redisClient = new Redis({
        host: process.env.REDIS_HOST || 'redis',
        port: parseInt(process.env.REDIS_PORT || '6379', 10),
        password: process.env.REDIS_PASSWORD || undefined,
    });

// Initialize store.
    redisStore = new RedisStore({
        client: redisClient,
        prefix: "ppark:",
    })
}

const sessionConfig = {
    store: redisStore,
    secret: process.env['APP_KEY'] || 'example-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: inProductionMode,
        httpOnly: true,       // Prevents client-side JS from reading the cookie
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
}
if (inProductionMode) {
    app.set('trust proxy', 1) // trust first proxy
    sessionConfig.cookie.secure = true // serve secure cookies
}

app.use(session(sessionConfig))

const webAppUrl = process.env.WEB_APP_URL || '';
// add any other client developer's IP to it
let whitelist = inProductionMode ? [
    "http://99.192.8.22:5173",
    webAppUrl,
    'http://localhost:5173',
    "https://properties-8eaf0.web.app",
    "https://ghanamls.org",
] : ['http://localhost:5173']

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

app.use(function(req,res,next){
    if(!req.session){
        return next(new Error('Invalid session connection')) //handle error
    }
    next() //otherwise continue
});

app.use(logIncomingRequests)

app.get('/health', (req, res) => {
    res.status(200).json({ status: `OK` })
})

app.get('/', (req, res) => {
    res.json({ message: `API VERSION ${apiVersion}` })
})

// Apply the rate limiter middleware to API routes only
if(inProductionMode) {
    app.use('/api', throttleMiddleware);
}
app.use('/api/auth', authRoutes)
app.use('/api/users', isAuthenticated, userRoutes)
app.use('/api/system', systemUserRoutes)
app.use('/api/packages', packageRoutes)
app.use('/api/properties', propertyRoutes )
app.use('/api/subscription', subscriptionRoutes )
app.use('/api/advertisements', adRoutes )
app.use('/api/showings', isAuthenticated, showingsRoutes )


app.get('/500', get500)

// Error Middleware
app.use(get500)

// any route other route
app.use('/', get404)

// database connection
db.authenticate()
.then(() => {
    console.log("databaseLog","Connection to the database has been established successfully.");
    // return User.create({ })
})
.catch((err: any) => {
    console.log("databaseLog","Connection error:", err.message);
});

// console.log("inserted result - ", result);
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})



