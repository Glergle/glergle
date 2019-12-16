import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
  content: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

var Post = mongoose.model('Post', postSchema)

export default Post
