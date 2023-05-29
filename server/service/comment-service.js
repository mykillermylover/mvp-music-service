const commentModel = require('../models/comment-model');
const postToCommentModel = require('../models/post-to-comment-model');

class CommentService {
    async createComment(post, text, email) {
        const response = await commentModel.create({timestamp: Date.now(), user: email, text: text});
        return response;
    }
    async createLinks(post, comment) {
        const response = await postToCommentModel.create({post: post, comment: comment});
        return response;
    }
    async deleteComment(comment) {
        const response = await commentModel.findByIdAndUpdate({_id: comment._id},{text: 'Комментарий удалён.'})
        return response;
    }
}

module.exports = new CommentService();