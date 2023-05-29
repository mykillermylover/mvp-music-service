const {validationResult} = require("express-validator");
const ApiError = require("../exceptions/api-error");
const commentService = require('../service/comment-service');
const UserDto = require('../dtos/user-dto');

class CommentController {
    async createComment(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()));
            }

            const {post, text} = req.body;
            const user = req.user;
            const commentData = await commentService.createComment(post, text, user.email);
            const link = await commentService.createLinks(post, commentData);

            return res.json({commentData, link});

        } catch (e) {
            next(e);
        }
    }

    async deleteComment(req,res,next) {
        try {
            const {comment} = req.body;
            const user = req.user;
            if(user.email !== comment.user && user.role < 1)
                return next(ApiError.RoleError());
            const deletedComment = await commentService.deleteComment(comment);
            return res.json(deletedComment);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new CommentController();