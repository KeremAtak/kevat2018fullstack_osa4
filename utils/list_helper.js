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


module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}