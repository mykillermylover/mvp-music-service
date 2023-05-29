const {Schema, model} = require('mongoose');

const TrackSchema = new Schema({
    name: {type: String, required: true, unique: false}
})

module.exports = model('Track', TrackSchema);