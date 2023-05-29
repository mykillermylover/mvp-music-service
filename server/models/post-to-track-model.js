const {Schema, model} = require('mongoose');
const PostToTrackSchema = new Schema({
    post: {type: Schema.Types.ObjectId, ref: 'Post'},
    track: {type: Schema.Types.ObjectId, ref: 'Track'},
})

module.exports = model('Post-To-Track', PostToTrackSchema);