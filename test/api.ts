/*



// third party
import { request } from 'supertest'

// intra-app
import { app } from '../app'
import { userData } from '../mockData'

// const usersRoute = app.get('/users', function (req, res) {
//     res.json(userData);
// });
app.get('/user', function (req, res) {
    res.status(200).json({ name: 'john' })
})

// docs: https://www.npmjs.com/package/supertest
request(app)
  .get('/user')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '15')
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
  });



  */