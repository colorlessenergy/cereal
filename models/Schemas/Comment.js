const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let commentSchema = new Schema({
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


const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;