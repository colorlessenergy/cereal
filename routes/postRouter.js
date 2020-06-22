const express = require('express');
const Router = express.Router();

const postsController = require('../controllers/posts/postsController');


Router.route('/:id')
  .get(postsController.getSinglePostById)

Router.route('/')
  .get(postsController.getAllPost)
  .post(postsController.createPost);

module.exports = Router;