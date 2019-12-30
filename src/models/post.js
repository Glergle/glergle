import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minlength: 1
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

var Post = mongoose.model('Post', postSchema)

export default Post
