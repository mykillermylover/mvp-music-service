const {Schema, model} = require('mongoose');
const PostSchema = new Schema({
    user: {
        email: String,
        id: Schema.Types.ObjectId,
    },
    date: {type: Date, required: true},
    name: {type: String, required: true},
    description: {type: String},
})

module.exports = model('Post', PostSchema);