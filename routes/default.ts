import { router } from '../app';

export const indexRoute = router.get('/', function (req, res, next) {
    // res.send('respond with a resource');
    res.render('index', { title: 'Express' });
});
