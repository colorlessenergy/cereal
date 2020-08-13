const express = require('express');
const Router = express.Router();

const commentController = require('../controllers/comments/commentsController');


Router.route('/:id')
  .get(commentController.getAllCommentsForAPost)
  .post(commentController.createComment);

module.exports = Router;