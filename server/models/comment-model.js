const {Schema, model} = require('mongoose');
const CommentSchema = new Schema({
    timestamp: {type: Date, required: true},
    user: {type: String, required: true},
    text: {type: String, required: true}
})

module.exports = model('Comment', CommentSchema);