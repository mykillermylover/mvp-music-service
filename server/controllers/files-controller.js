const _ = require('lodash');

class FilesController {
    async getFiles(req,res) {
        try {
            if(!req.files) {
                res.send({
                    status: false,
                    message: 'No file uploaded'
                });
            } else {
                let data = [];
                if(req.files.tracks[0] === undefined) {
                    let track = req.files.tracks;
                    console.log(track);
                    track.mv('C:/OSPanel/domains/project/server/public/tracks/' + track.name);
                    data.push({
                        name: track.name,
                        mimetype: track.mimetype,
                        size: track.size
                    });
                } else {
                    //loop all files
                    _.forEach(_.keysIn(req.files.tracks), (key) => {
                        let track = req.files.tracks[key];
                        //move photo to uploads directory
                        track.mv('C:/OSPanel/domains/project/server/public/tracks/' + track.name);
                        //push file details
                        data.push({
                            name: track.name,
                            mimetype: track.mimetype,
                            size: track.size
                        });
                    });
                }
                //return response
                res.send({
                    status: true,
                    message: 'Files are uploaded',
                    data: data
                });
            }
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}

module.exports = new FilesController();