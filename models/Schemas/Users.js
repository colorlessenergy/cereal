const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  FIREBASE_ID: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;