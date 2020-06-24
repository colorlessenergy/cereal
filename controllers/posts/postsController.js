const Posts = require('../../models/Schemas/Post');
const Users = require('../../models/Schemas/Users');

exports.getAllPost = function (req, res, next) {
  Posts.find({})
    .then((posts) => res.status(200).json(posts))
    .catch((err) => res.status(500).send('internal server error '));
}

exports.getSinglePostById = function (req, res, next) {
  Posts.findById(req.params.id)
    .then(function (post) {
      return res.status(200).json(post);
    })
    .catch(err => res.status(401).send(err));
}

/**
  create a post. 
  Save the User mongo generated ID to the post and save the ID of the post created to the user.

  @param {String} req.body.FIREBASE_ID - ID provided by firebase auth and saved in the user
  @param {String} req.body.cereal - type of cereal the post is about
  @param {String} req.body.content - review of the cereal
  @return {Object} - created post
*/

exports.createPost = function (req, res, next) {
  if (req.body.cereal === '') {
    return res.status(400).send('Missing Cereal');
  }

  if (req.body.content === '') {
    return res.status(400).send('Missing Content');
  }

  if (req.body['FIREBASE_ID']) {
    Users.findOne({ 'FIREBASE_ID': req.body.FIREBASE_ID })
      .then(function (user) {
        let formatData = {
          cereal: req.body.cereal,
          content: req.body.content,
          createdBy: user._id
        };

        // store the saved post in outer scope to be able
        // to return it later in a different inner scope
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
          .catch((err) => res.status(500).send(err));
      })
      .catch(err => res.status(500).send(err));

    
  } else {
    return res.status(401).send('Missing FIREBASE ID');
  }
}