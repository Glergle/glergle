import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: String,
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

userSchema.methods.getPosts = function () {
  return mongoose.model('Post').find({ user: this._id })
}

var User = mongoose.model('User', userSchema)

export default User
