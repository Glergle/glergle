import express from 'express'
import postController from '../controllers/postController'

const router = express.Router()

router.route('/:userid/glerks')
  .get(postController.index)
  .post(postController.create)

router.route('/:userid/glerks/:glerkid')
  .get(postController.show)

export default router
