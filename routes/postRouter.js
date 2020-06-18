const express = require('express');
const Router = express.Router();

const postsController = require('../controllers/posts/postsController');

Router.route('/')
  .get(postsController.getAllPost)
  .post(postsController.createPost);


module.exports = Router;