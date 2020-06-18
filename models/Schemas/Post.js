const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let postSchema = new Schema({
  cereal: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: Schema.Types.ObjectId, ref: 'User'
  }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;