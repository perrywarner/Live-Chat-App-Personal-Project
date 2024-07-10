import createError from 'http-errors'
import express, { Router } from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'
import { Model, ModelCtor, Sequelize } from 'sequelize';
import { config } from 'dotenv';

// Load .env file contents into process.env
config();

// creates instances of Express framework & Express's URL Router that will be referenced across the backend (singletons)
export const app = express()
export const router = Router()

// Connect to PostgreSQL via the Sequelize ORM
export let dbConnection: Sequelize | undefined = undefined;

const RDS_DB_NAME = process.env.RDS_DB_NAME;
const RDS_USERNAME = process.env.RDS_USERNAME;
const RDS_PASSWORD = process.env.RDS_PASSWORD;
const RDS_URL = process.env.RDS_URL;

import { setupMessageModel, setupUserModel } from './models/index'
if (!RDS_URL || !RDS_DB_NAME || !RDS_PASSWORD || !RDS_USERNAME) {
    console.log('imported the following env vars:', config().parsed)
    throw new Error('Missing required environment variable: RDS_DATABASE_URL');
} else {
    // Set up the DB connection
    dbConnection = new Sequelize(RDS_DB_NAME, RDS_USERNAME, RDS_PASSWORD, {
      host: RDS_URL,
      dialect: 'postgres',
      port: 5432,
      dialectOptions: {
        ssl: {
          require: false, // TODO turn SSL back on!!!!! (also requires tweaking RDS -> parameter groups -> parameters -> rds.force_ssl -> 1 [instead of current 0] -> reboot)
          rejectUnauthorized: false // adjust based on your SSL settings
        }
      },
      // TODO in future: if I'm finding the "console log every query" too spammy or something, tune this to something else via https://sequelize.org/docs/v6/getting-started/#logging
      logging: console.log, // This is the default behavior, just making it explicit for visibility.
    });
    
    // Check that it works
    console.log('\n✨ Attempting to connect to the Postgres DB via our Sequelize ORM ✨')
    dbConnection.authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
      })
      .catch(err => {
        console.error('Unable to connect to the database:', err);
      });
}

// create and share singletons of our app's internal services
import { UserService, MessageService } from './services'
export const User = new UserService(dbConnection)
export const Message = new MessageService(dbConnection)

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// According to https://expressjs.com/en/resources/middleware/cookie-parser.html, app.use(cookieParser()) should be fine.. Using a type assertion here.
app.use(cookieParser() as any)
app.use(express.static(path.join(__dirname, 'public')))

// Note: need a CORS allow for the origin of the UI request (initially localhost:3001 (where this server is localhost:3000), future something else).
// I found the hard way that I CANNOT just send requests from the UI side with fetch request (mode: 'no-cors')
// because fetch requests initiated with (mode: 'no-cors') behave like "Opaque Responses": you can see the network request tab in google chrome initially says query success OK 200 with data null and then a few ms later it is automagically populated with data.
// Redux (base) and Redux (with RTK Query) both can't seem to handle these opaque responses and they only see the half-finished "resolve" (multi step resolve?) and immediately reject the network request - even if the request later resolves successfully.
// * Shoutout to Kathy for helping me with this one!
// * more info on CORS "opaque response" weirdness: https://stackoverflow.com/questions/36292537/what-is-an-opaque-response-and-what-purpose-does-it-serve
// * followed tutorial: https://www.section.io/engineering-education/how-to-use-cors-in-nodejs-with-express/
app.use(
    cors({
        origin: 'http://localhost:3000',
    })
)

// !!!!!WARNING!!!!: these imports must be done AFTER "app" & "router" are initialized or else will get errors like:
// /routes/indexRoute.ts:3: export const indexRoute = router.get('/', function (req, res, next) {
// TypeError: Cannot read properties of undefined (reading 'get')
import { indexRoute, usersRoute, messagesRoute, dbTestRoute } from './routes'
app.use('/', indexRoute)
app.use('/users', usersRoute)
app.use('/messages', messagesRoute)
app.use('/dbTest', dbTestRoute)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404))
})

// error handler
// app.use(function (err, req, res) {
//     /** !!!!!!! NOTE TO SELF: uncomment whole function and debug compile errors !!!!!!!
//      * I commented out this whole "error handler middleware" fn because the following line of code "res.locals.message = err.message" caused
//      * TS Error: Property 'locals' does not exist on type 'NextFunction'.ts(2339) <sidenote: param "res" is of type NextFunction>
//      */
//     // set locals, only providing error in development
//     res.locals.message = err.message
//     res.locals.error = req.app.get('env') === 'development' ? err : {}

//     // render the error page
//     res.status(err.status || 500)
//     res.render('error')
// })
