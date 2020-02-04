import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

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

userSchema.methods.validPassword = function (pass) {
  return bcrypt.compare(pass, this.password)
    .then(res => {return res})
}

userSchema.index({ username: 1, email: 1 }, { unique: true })

var User = mongoose.model('User', userSchema)

export default User
