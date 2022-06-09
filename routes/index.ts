let router = express.Router()

/* GET home page. */ router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' })
})

module.exports = router
// perry hack - source: https://github.com/microsoft/TypeScript/issues/47229#issuecomment-1112450734
export {}
