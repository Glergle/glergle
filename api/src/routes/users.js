import express from 'express'
import userController from '../controllers/userController'
import authController from '../controllers/authController'

const router = express.Router()

router.route('/register')
  .post(userController.create)

router.route('/login')
  .post(authController.login)

router
  .route('/me')
  .get(userController.show)

export default router
