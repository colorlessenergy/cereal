const Post = require('../../models/Schemas/Post');
const Users = require('../../models/Schemas/Users');
const Comments = require('../../models/Schemas/Comment');

/**
 * get all comments for a single post
 * 
 * @param {String} req.params.id - the id of the post
 * @return {Object} - post with comments
 */

exports.getAllCommentsForAPost = function (req, res, next) {
  Post.findById(req.params.id)
    .populate('comments')
    .exec()
    .then(function (postWithComments) {
      return res.json(postWithComments).status(200)
    })
    .catch(function (err) {
      return res.status(403).send('error fetching comments');
    });
}


/**
  create a comment.
  Save the comment Mongo generated ID to the post and the user

  @param {String} req.body.FIREBASE_ID - ID provided by firebase auth and saved in the user
  @param {String} req.body.content - comment content
  @return {Object} - comment 
*/


exports.createComment = function(req, res, next) {
  if (!req.body.content) {
    return res.status(400).send('Missing Content');
  }

  if (req.body['FIREBASE_ID']) {
    Users.findOne({ 'FIREBASE_ID': req.body.FIREBASE_ID })
      .then(function (user) {
        let formatData = {
          content: req.body.content,
          createdBy: user._id
        };
        let comment = new Comments(formatData);
        return comment.save()
          .then(function (comment) {
            Post.findById(req.params.id)
              .then(function (post) {
                post.comments.push(comment['_id']);
                post.save()
                .then(function () {
                  user.comments.push(comment['_id']);
                  user.save()
                  .then(function () {
                    return res.json(comment).status(200);
                  })
              })
            })
            .catch(err => res.status(401).send(err));
          })
      })
      .catch(err => res.status(500).send(err));
  } else {
    return res.status(401).send('Missing FIREBASE ID');
  }
}