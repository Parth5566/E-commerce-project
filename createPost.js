const express = require('express');
const router = express.Router();
const Post = require('../models/Post');


router.post('/addPost', async (req, res) => {
        try {
            const { title, content, User} = req.body;
            
            const post = new Post({
                title, content, User
            })
            const savedPost = await post.save()
            res.json(savedPost)
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

    router.get('/getAllPosts', async (req, res) => {
        try {
            const posts = await Post.find().populate('User');
            res.status(200).json(posts);
        } catch (error) {
            console.error("Error fetching posts:", error);
            res.status(500).json({ message: 'Failed to fetch posts' });
        }
    });

module.exports = router;
