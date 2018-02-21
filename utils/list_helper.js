const Blog = require('../models/blog')

const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  var totalAmount = blogs.reduce(function(total, blog) {
    return total + blog.likes
  }, 0)
  return totalAmount === 0 ? 0 : totalAmount
}

const favouriteBlog = (blogs) => {
  var favourite = blogs.reduce(function(biggest, blog) {
    return biggest.likes > blog.likes ? biggest : blog
  }, blogs[0])
  return favourite === 0 ? 0 : favourite
}

const mostBlogs = (blogs) => {
  var objects = {}
  for (i = 0; i < blogs.length; i++) {
    if (blogs[i].author in objects) {

    } else {
      var object = {author: blogs[i].author, blogs: 1}
      Object.assign(objects, object)
    }
  }
  return 1;
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs
}