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
  },
  followers: [{
    type: String
  }],
  following: [{
    type: String
  }],
})

userSchema.methods.getPosts = function () {
  return mongoose.model('Post').find({ user: this._id })
}

userSchema.methods.followUser = function (user) {
  return this.following.push(user)
}

userSchema.methods.unfollowUser = function (user) {
  let index = this.following.indexOf(user)
  if (index > -1) {
    return this.following.splice(index, 1)
  }
}

userSchema.methods.addFollower = function (user) {
  return this.followers.push(user)
}

userSchema.methods.removeFollower = function (user) {
  let index = this.followers.indexOf(user)
  if (index > -1) {
    return this.followers.splice(index, 1)
  }
}

userSchema.methods.validPassword = function (pass) {
  return bcrypt.compare(pass, this.password)
    .then(res => {return res})
}

userSchema.index({ username: 1, email: 1 }, { unique: true })

var User = mongoose.model('User', userSchema)

export default User
