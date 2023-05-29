const postToTrackModel = require('../models/post-to-comment-model');

class PostToCommentService {
    async getComments(post) {
        const comments = postToTrackModel.find({post}).populate('comment');
        return comments;
    }
}
module.exports = new PostToCommentService();