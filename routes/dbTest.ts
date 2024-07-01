import { router } from '../app'

export const dbTestRoute = router.get('/dbTest', function (req, res, next) {
    // res.send('respond with a resource');
    console.log(`App running on port`);
    res.send('App running on port ?');
})
