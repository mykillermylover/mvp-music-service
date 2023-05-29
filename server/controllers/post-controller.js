const ApiError = require('../exceptions/api-error');
const postService = require('../service/post-service');
const postModel = require('../models/post-model');
const trackService = require('../service/track-service');
const postToTrackService = require('../service/post-to-track-service');
const postToCommentService = require('../service/post-to-comment-service');
const {validationResult} = require("express-validator");
const _ = require("lodash");
const iconv = require('iconv-lite')
const {Iconv} = require("iconv");

class PostController {
    async createPost(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()));
            }

            const {email, name, description} = req.body;
            console.log(email, name, description);
            const postData = await postService.createPost(email, name, description);

            let tracksData = [];
            if(!req.files) {
                return res.status(200).json({postData,tracksData});
            }
            //loop all files
            await _.forEach(_.keysIn(req.files), async (key) => {
                let track = req.files[key];
                let trackName = track.name.slice(0, -4)

                let buffer = new Buffer.alloc(trackName.length, trackName,'binary');
                trackName = iconv.decode(buffer,"utf-8").toString();

                console.log('Название трека:___',trackName);
                const trackData = await trackService.createTrack(trackName);
                const trackPath = await postToTrackService.createLink(postData, trackData);
                //push file details
                await track.mv('C:/OSPanel/domains/project/server/public/tracks/' + trackPath + '.mp3');
                tracksData.push({
                    name: track.name,
                    mimetype: track.mimetype,
                    size: track.size,
                    id: trackData._id,
                });
            });

            return res.status(200).json({postData,tracksData});
        } catch (e) {
            next(e);
        }
    }

    async updatePost(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()));
            }
            const post = req.body.post;
            const response = await postService.updatePost(post);
            return res.json(response);
        } catch (e) {
            next(e);
        }
    }

    async deletePost(req, res, next) {
        try {
            const candidate = await postModel.findOne({email: req.user.email, _id: req.params.id});
            if(!candidate && req.user.role < 1) {
                return next(ApiError.RoleError());
            }
            if(req.user.role < 1 && candidate.id !== req.params.id)
                return next(ApiError.RoleError());

            const postId = req.params.id;
            const response = await postService.deletePost(postId);
            return res.json(response);
        } catch (e) {
            next(e);
        }
    }

    async getPosts(req, res, next) {
        try {
            const data = [];
            const posts = await postService.getAllPosts();
            for(const post of posts) {
                const postToTracks = await postToTrackService.getTracks(post);
                const postToComments = await postToCommentService.getComments(post);
                data.push({post, postToTracks, postToComments});
            }
            return res.json(data);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new PostController();