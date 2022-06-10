import createError from 'http-errors'
import express, { Router } from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

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

const indexRoute = router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' })
})

const usersRoute = router.get('/', function (req, res, next) {
    // res.send('respond with a resource');

    res.json([
        {
            id: 1,
            username: 'MyFirstUser',
        },
        {
            id: 2,
            username: 'coolguy32',
        },
    ])
})

app.use('/', indexRoute)
app.use('/users', usersRoute)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}
    
    // render the error page
    res.status(err.status || 500)
    res.render('error')
})