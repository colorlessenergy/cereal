const Posts = require('../../models/Schemas/Post');
const Users = require('../../models/Schemas/Users');

exports.getAllPost = function (req, res, next) {
  Posts.find({})
    .then((posts) => res.status(200).json(posts))
    .catch((err) => res.status(500).send('internal server error '));
}

exports.createPost = function (req, res, next) {
  if (req.body['FIREBASE_ID']) {

    Users.findOne({ 'FIREBASE_ID': req.body.FIREBASE_ID })
      .then(function (user) {
        let formatData = {
          cereal: req.body.cereal,
          content: req.body.content,
          createdBy: user._id
        };
        let savedPost = null;

        let post = new Posts(formatData);
        post.save()
          .then((newPost) => {
            // save the id of the post to the User in DB
            savedPost = newPost;
            return Users.findById(user._id)
          })
          .then(function (user) {
            user.posts.push(savedPost['_id']);
            return user.save()
          })
          .then(function () {
            return res.status(200).json(savedPost);
          })
          .catch((err) => res.status(401).send(err));
      })
      .catch(err => res.status(401).send(err));

    
  } else {
    return res.status(403).send('not authorized to be here');
  }
}