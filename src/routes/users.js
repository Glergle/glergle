import express from 'express'
import userController from '../controllers/userController'

const router = express.Router()

router
  .route('/me')
  .get(userController.show)

export default router
