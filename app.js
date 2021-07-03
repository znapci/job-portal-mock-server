const express = require('express')
const cors = require('cors')
const app = express()
// const path = require('path');
const jdata = require('./data.json')
const data = Array(15).fill(jdata)
const date = new Date()
const LoremIpsum = require('lorem-ipsum').LoremIpsum

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
})

const t = data.map((post, id) =>
({
  ...post,
  id: id,
  companyUrl: 'bhavam',
  joinByDate: date.toLocaleDateString(),
  applyByDate: date.toLocaleDateString(),
  place: 'Nitte',
  tags: ['new', 'hot', 'trending', 'in-demand', 'test'],
  modalContent: {
    responsibilities: ['Design the system', 'Implement designs', 'Collaborate with others', 'Come up with new ideas'],
    requirements: ['Have basic knowledge of database', 'Know React', 'Know Node.js/express.js', 'Know git-github', 'available for next 2 months'],
    description: lorem.generateParagraphs(3)
  }
})
)



app.use(cors())
app.use(express.json())

let count = 0
const singlePost = (req, res, next) => {
  console.log('in ExpandedPost', req.params)
  res.status(200).send(`Post ${req.params.id}`)
}
const displayPosts = (req, res, next) => {
  console.log('no. of req to displayPosts: ', ++count);
  const nd = {
    postsData: t,
    pageData: {
      totalPages: 20,
    }
  }
  console.log(req.params);
  if (req.params.pageNo <= 20 && req.params.pageNo > 1) {
    res.status(200).json(nd);
  }
  else
    res.status(404).send('Not found');
}
const delay = (req, res, next) => {
  setTimeout(next, 2000)
}
const addPost = (req, res, next) => {
  console.log(req.body)
}
const login = (req, res, next) => {
  console.log(req.body)// spits empty object
  if (req.body.password === 'success') {
    res.json({
      status: 'success',
      token: 'lol'
    })
  } else {
    res.json({
      status: 'failure',
      token: 'lol'
    })
  }
}
const company = (req, res, next) => {
  console.log(req.body)
  res.redirect('http://google.com')
}
// const sendImage = (req, res, next) => {
//     console.log('image');
//     res.sendFile(path.join(__dirname, 'ubuntu.png'));
// }

app.get('/post/:id', singlePost)
app.get('/posts/:pageNo', delay, displayPosts)
app.post('/addpost', addPost)
app.get('/company', company)
app.post('/login', delay, login)
// app.use('/img', delay, sendImage);
app.listen(8000)
