/* GET users listing. */
router.get('/', function (req, res, next) {
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

module.exports = router

// perry hack - source: https://github.com/microsoft/TypeScript/issues/47229#issuecomment-1112450734
export {}