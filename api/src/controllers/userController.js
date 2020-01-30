import User from '../models/user'
import bcrypt from 'bcrypt'

const saltRounds = 12

const userController = {}
userController.show = async (req, res) => {
  const id = req.body.id
  const user = await User.findById(id)
  user ? res.send(user) : res.send(404)
}

userController.create = async (req, res) => {
  const { name, username, password, passConfirm, email } = req.body

  if (!password || password !== passConfirm) {
    res.status(401).send('Passwords do not match')
  }

  bcrypt.hash(password, saltRounds)
    .then(hash => {
      const newUser = {
        name: name,
        username: username,
        email: email,
        password: hash
      }
      new User(newUser).save()
        .then(user => res.status(200).send(`User ${user.name} created successfully`))
        .catch(err => res.status(400).send(err.message))
    })
    .catch(err => {
      console.log(err)
      res.send('Something went wrong')
    })
}

export default userController
