const express = require('express');
const cors = require('cors');
const app = express();
//const path = require('path');
const jdata = require('./data.json');
const data = Array(20).fill(jdata);
const date = new Date();

const t = [];
data.map((post, id) => {
    t.push({
        ...post, id: id,
        companyUrl: 'bhavam',
        joinByDate: date.toDateString(),
        applyByDate: date.toDateString(),
        tags: ['new', 'hot', 'trending', 'in-demand', 'test']
    })
})

app.use(cors());
app.use(express.json());

let count = 0;
const singlePost = (req, res, next) => {
    console.log('in ExpandedPost', req.params);
    res.status(200).send(`Post ${req.params.id}`);
}
const displayPosts = (req, res, next) => {
    console.log('no. of req to displayPosts: ', ++count);
    res.status(200).json(t);
}
const delay = (req, res, next) => {
    setTimeout(next, 2000)
}
const addPost = (req, res, next) => {
    console.log(req.body);
}
const login = (req, res, next) => {
    console.log(req.body);//spits empty object
    res.send(req.body);
}
const company = (req, res, next) => {
    console.log(req.body);
    res.redirect('http://google.com')
}
// const sendImage = (req, res, next) => {
//     console.log('image');
//     res.sendFile(path.join(__dirname, 'ubuntu.png'));
// }

app.get('/post/:id', singlePost);
app.get('/posts', delay, displayPosts);
app.post('/addpost', addPost);
app.get('/company', company)
app.post('/login', login);
// app.use('/img', delay, sendImage);
app.listen(8000);
