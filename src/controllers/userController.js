import User from '../models/user'

const userController = {}
userController.show = async (req, res) => {
  const id = req.body.id
  const user = await User.findById(id)
  user ? res.send(user) : res.send(404)
}

export default userController
