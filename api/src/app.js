import express from 'express'
import bodyParser from 'body-parser'
import config from './config'
import userRoutes from './routes/users'
import postRoutes from './routes/posts'
import loaders from './loaders'

const app = express()

loaders()

app.use(bodyParser.json())
app.use(config.api.prefix, [userRoutes, postRoutes])

app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    errors: {
      message: err.message
    }
  })
})

export default app
