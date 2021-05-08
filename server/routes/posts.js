const express = require('express');
const router = express.Router();

const Posts = require('../controllers/posts');
const getPosts = Posts.getPosts;
const createPost = Posts.createPost;
const updatePost = Posts.updatePost;
const deletePost = Posts.deletePost;
const likePost = Posts.likePost;

router.get('/', getPosts); // GET Request
router.post('/', createPost); // POST Request
router.patch('/:id', updatePost); // UPDATE Request
router.delete('/:id', deletePost); // Delete Request
router.patch('/:id/likePost', likePost); // Like Post

module.exports = router;