const trackModel = require('../models/track-model');

class TrackService {

    async createTrack(name) {
        const candidate = await trackModel.findOne({name});
        if(candidate) {
            name += Date.now();
        }
        const track = await trackModel.create({name});
        return {track};
    }

}

module.exports = new TrackService();