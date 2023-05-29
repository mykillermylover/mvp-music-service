const {Schema, model} = require('mongoose')

const PostToCommentSchema = new Schema({
    post: {type: Schema.Types.ObjectId, ref:'Post'},
    comment: {type: Schema.Types.ObjectId, ref: 'Comment'}
})

module.exports = model('post-to-comment',PostToCommentSchema);