const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }

  res.status(400).json({redirect: '/login'})
}

export default isLoggedIn