// const { Mongoose } = require('mongoose');
const mongoose = require('mongoose');
const PostMessgae = require('../models/postMessage');

module.exports.getPosts = async (req, res) => {
    try {
        const postMessage = await PostMessgae.find();
        // console.log(postMessage);
        res.status(200).json(postMessage);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

module.exports.createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessgae(post);
    try {
        // console.log(post);
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

module.exports.updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    let ObjectId = require('mongoose').Types.ObjectId;
    if (!ObjectId.isValid(_id))
        return res.status(404).send("No Post Found!");

    const updatedPost = await PostMessgae.findByIdAndUpdate(_id, { ...post, _id }, { new: true });
    res.json(updatedPost);
};

module.exports.deletePost = async (req, res) => {
    const { id: _id } = req.params;
    let ObjectId = require('mongoose').Types.ObjectId;
    if (!ObjectId.isValid(_id))
        return res.status(404).send("No Post Found!");

    const deletedPost = await PostMessgae.findByIdAndDelete(_id);
    res.json(deletedPost);
}

module.exports.likePost = async (req, res) => {
    const { id: _id } = req.params;
    let ObjectId = require('mongoose').Types.ObjectId;
    if (!ObjectId.isValid(_id))
        return res.status(404).send("No Post Found!");

    const post = await PostMessgae.findById(_id);
    const updatedPost = await PostMessgae.findByIdAndUpdate(_id, { likeCount: post.likeCount + 1 }, { new: true });

    res.json(updatedPost);
}