const Blog = require('../models/blog')

const initialBlogs = [
    
  {
    _id: '41224d776a326fb40f000001',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '41224d776a326fb40f000002',
    title: 'Otsikko 1',
    author: 'Matti Meikäläinen',
    url: 'http://kuvaton.com',
    likes: 13,
    __v: 0
  },
  {
    _id: '41224d776a326fb40f000003',
    title: 'Otsikko 2',
    author: 'Maija Meikäläinen',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 2,
    __v: 0
  },
  {
    _id: '41224d776a326fb40f000004',
    title: 'Otsikko 3',
    author: 'Maija Meikäläinen',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 3,
    __v: 0
  },
  {
    _id: '41224d776a326fb40f000005',
    title: 'Otsikko 4',
    author: 'Maija Meikäläinen',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 4,
    __v: 0
  }
]

const listWithOneBlog = [
  {
    _id: '41224d776a326fb40f000001',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const formatBlog = (blog) => {
  return {
    id: blog._id,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes
  }
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(formatBlog)
}


module.exports = {
  initialBlogs, listWithOneBlog, formatBlog, blogsInDb
}