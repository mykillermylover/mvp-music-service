const PostModel = require('../models/post-model');
const UserModel = require('../models/user-model');
const PostToTrackModel = require('../models/post-to-track-model');
const PostToCommentModel = require('../models/post-to-comment-model');
const TrackModel = require('../models/track-model');
const CommentModel = require('../models/comment-model');
const UserDto = require('../dtos/user-dto');
const {json} = require("express");
const mongoose = require('mongoose');

class PostService {

    async createPost(email, name, description) {
        const candidate = await UserModel.findOne({email});
        const userDto = new UserDto(candidate);
        console.log(userDto);
        const date = new Date();
        const post = await PostModel.create({user: userDto, date, name, description});
        console.log('Созданный пост:');
        console.log(post);
        return {
            post
        }
    }


    async getAllPosts() {
        const posts = await PostModel.find().sort({date: -1});
        return posts;
    }

    async deletePost(postId) {
        const response = await PostModel.findByIdAndDelete({_id: postId});
        const postToTracks = await PostToTrackModel.find({post: postId});
        await PostToTrackModel.deleteMany({post: postId});
        const postToComments = await PostToCommentModel.find({post:postId});
        await PostToCommentModel.deleteMany({post: postId});
        for(const postToTrack of postToTracks) {
            await TrackModel.findOneAndDelete({_id: postToTrack.track})
        }
        for(const postToComment of postToComments) {
            await CommentModel.findOneAndDelete({_id: postToComment.comment})
        }
    }

    async updatePost(post) {
        const updatingPost = await PostModel.findByIdAndUpdate({_id: post._id}, {
            name: post.name,
            description: post.description
        });
        const links = await PostToTrackModel.find({post: post._id, track: {$nin: post.tracks}});
        for(const link of links) {
            await TrackModel.findOneAndDelete({track: link.track});
        }
        const deletingLinks = await PostToTrackModel.deleteMany({post: post._id, track: {$nin: post.tracks}})
        return updatingPost;

    }
}

module.exports = new PostService();