const express = require('express');
const cors = require('cors');

const app = express();
const data = require('./data.json');

let count = 0;
const singlePost = (req, res, next) => {
    console.log('in ExpandedPost', req.params);
    res.status(200).send(`Post ${req.params.id}`);
}
const displayPosts = (req, res, next) => {
    console.log('no. of req to displayPosts: ', ++count);
    res.status(200).json(data);
}
const delay = (req, res, next) => {
    setTimeout(next, 2000)
}
const addPost = (req, res, next) => {
    console.log(req.body);
}
app.use(cors());
app.get('/post/:id', singlePost);
app.get('/posts', delay, displayPosts);
app.post('/addpost', addPost);
app.listen(8000);
