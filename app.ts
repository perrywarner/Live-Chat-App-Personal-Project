import createError from 'http-errors'
import express, { Router } from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'

// create & share singleton instances of our app's internal logic engines
import { UserService, MessageService } from './services'
export const User = new UserService()
export const Message = new MessageService()

// creates instances of Express framework & Express's URL Router that will be referenced across the backend (singletons)
export const app = express()
export const router = Router()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
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
import { indexRoute, usersRoute, messagesRoute } from './routes'
app.use('/', indexRoute)
app.use('/users', usersRoute)
app.use('/messages', messagesRoute)

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
