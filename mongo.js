const mongoose = require('mongoose')

const url = "mongodb://atak:passu@ds237848.mlab.com:37848/osa4kanta1"

mongoose.connect(url)

const Blog = mongoose.model('Blog', {
  title: String,
  author: String,
  url: String,
  likes: Number
})

Blog
  .find({})
  .then(result => {
    result.forEach(blog => {
      console.log(blog)
    })
    mongoose.connection.close()
  })


/*
const note = new Note({
  content: 'HTTP-protokollan tärkeimmät metodit ovat GET ja POST',
  date: new Date(),
  important: false
})

note
  .save()
  .then(response => {
    console.log('note saved!')
    mongoose.connection.close()
  })
*/