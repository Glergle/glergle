import express from 'express'
import loaders from './loaders'
import User from './models/user'

const app = express()

loaders()

app.get('/hello', (req, res) => {
  new User({
    name: 'Test User',
    username: 'testuser',
    email: 'email@example.com',
    password: 'unsafepass'
  }).save()
    .then((user) => {
      res.status(200).send(user)
    })
    .catch(e => console.log('error: ', e))
})

export default app
