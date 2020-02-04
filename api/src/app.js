import express from 'express'
import session from 'express-session'
import bodyParser from 'body-parser'
import passport from 'passport'
import {Strategy as LocalStrategy} from 'passport-local'
import cors from 'cors'
import config from './config'
import userRoutes from './routes/users'
import postRoutes from './routes/posts'
import loaders from './loaders'
import User from './models/user'

const app = express()

loaders()

app.use(bodyParser.json())
app.use(cors())

app.use(session({
  secret: config.secret,
  resave: true,
  saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(
  (username, password, done) => {
    User.findOne({ username: username}, (err, user) => {
      if (err) {return done(err)}

      if (!user) {
        return done(null, false, {message: 'Incorrect username'})
      }

      if (!user.validPassword(password)) {
        return done(null, false, {message: 'Incorrect password'})
      }

      return done(null, user)
    })
  }
))

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

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
