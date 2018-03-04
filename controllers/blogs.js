const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async(request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })

  response.json(blogs.map(Blog.format))
})

blogsRouter.delete('/:id', async(request, response) => {
  const body = request.body

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const blog = await Blog.findById(request.params.id)
    
    if (!decodedToken.id) {
      return response.status(401).json({ error : 'token missing or invalid'})
    }

    const user = await User.findById(decodedToken.id)

    if (blog.user === null) {
      await Blog.findByIdAndRemove(request.params.id)
    } else {
      if (blog.user.toString() !== user.id.toString()) {
        return response.status(401).json({ error : 'unauthorized action'})
      }
      await Blog.findByIdAndRemove(request.params.id)
    }
    response.status(204).end()
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'malformatted id'})
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!decodedToken.id) {
      return response.status(401).json({ error : 'token missing or invalid'})
    }
    if (body.title === undefined) {
      return response.status(400).json({error: 'title missing'})
    }
    if (body.url === undefined) {
      return response.status(400).json({error: 'url missing'})
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
      user: user.id
    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(Blog.format(savedBlog));
  } catch (exception) {
    console.log(exception)
    response.status(500).json({error: 'something went wrong...'})
  }
})

blogsRouter.put('/:id', async(request, response) => {
  try {
    const body = request.body

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes
    }

    Blog
      .findByIdAndUpdate(request.params.id, blog, { new: true })
      .then(updatedBlog => {
        response.json(Blog.format(blog))
      })
      .catch(error => {
        console.log(error)
        response.status(400).send({ error: 'malformatted id'})
      })
  } catch (exception) {
    console.log(exception)
    response.status(500).json({error: 'something went wrong...'})
  }
})

module.exports = blogsRouter