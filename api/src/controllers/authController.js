import passport from 'passport'

const authController = {}

authController.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {return next(err)}
    if (!user) {
      return res.status(400).json({message: 'username incorrect'})
    }
    req.login(user, err => {
      if (err) { return next(err) }
      return res.status(200).json(req.session)
    })
  })(req, res, next)
}

export default authController