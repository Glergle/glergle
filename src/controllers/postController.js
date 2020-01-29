import Post from '../models/post'
import User from '../models/user'

const postController = {}

postController.index = async (req, res) => {
  const user = await User.findById(req.params.userid)

  const posts = await user.getPosts()

  res.send(200, posts)
}

postController.create = async (req, res) => {
  const post = {
    content: req.body.content,
    user: req.params.userid
  }

  new Post(post).save()
    .then(post => res.status(200).send(post))
    .catch(err => res.send(err))
}

postController.show = async (req, res) => {
  Post.findById(req.params.glerkid)
    .then(post => !post ? res.sendStatus(400) : res.status(200).send(post))
    .catch(err => res.send(err))
}

export default postController
