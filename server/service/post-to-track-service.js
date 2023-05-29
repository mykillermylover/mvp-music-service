const postToTrackModel = require('../models/post-to-track-model');
const trackModel = require('../models/track-model');

class PostToTrackService {

    async createLink(post, track) {
        console.log('Пост:');
        console.log(post.post);
        console.log('Трек:');
        console.log(track.track);
        const link = await postToTrackModel.create({post: post.post, track: track.track});
            console.log(link);
        return track.track._id;
    }

    async getTracks(post) {
        const tracks = await postToTrackModel.find({post}).populate('track');
        return tracks;
    }

}
module.exports = new PostToTrackService();