const { Router } = require('express');
const userController = require('../controllers/user-controller');
const postController = require('../controllers/post-controller');
const logController= require('../controllers/log-controller');
const commentController = require('../controllers/comment-controller');
const router = new Router();
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');
const express = require("express");

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/set-user-role', userController.setUserRole);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);

router.get('/logs',authMiddleware, logController.getLogs);

router.post('/create-post', authMiddleware,
    body('name').not().isEmpty(),
    body('description').not().isEmpty(),
    postController.createPost);
router.put('/update-post', authMiddleware,
    body('post.name').not().isEmpty(),
    body('post.description').not().isEmpty(),
    authMiddleware, postController.updatePost);
router.post('/delete-post/:id', authMiddleware, postController.deletePost);
router.get('/posts', postController.getPosts);

router.post('/create-comment',authMiddleware,
    body('text').not().isEmpty(),
    commentController.createComment);
router.post('/delete-comment',authMiddleware,
    commentController.deleteComment)
module.exports = router