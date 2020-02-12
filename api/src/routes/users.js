import express from 'express'
import userController from '../controllers/userController'
import authController from '../controllers/authController'
import followController from '../controllers/followController'
import isLoggedIn from '../middleware/auth'

const router = express.Router()

router.route('/register')
  .post(userController.create)

router.route('/login')
  .post(authController.login)

router.route('/:username/follow')
  .post(isLoggedIn, followController.follow)

router
  .route('/me')
  .get(userController.show)

export default router
