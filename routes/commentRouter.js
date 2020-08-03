const express = require('express');
const Router = express.Router();

const commentController = require('../controllers/comments/commentsController');


Router.route('/:id')
  .post(commentController.createComment);

module.exports = Router;