const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const { format, initialBlogs, blogsInDb } = require('./test_helper')



beforeEach(async() => {
  await Blog.remove({})

  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await (Promise.all(promiseArray))
})

describe('blog post tests', () => {

  test('blog post success', async () => {
    const blogsAtStart = await blogsInDb()

    const newBlog = {
      title: 'Kekseliäs otsikko',
      author: 'Peter Pasanen',
      url: 'https://naurunappula.com/',
      likes: 1
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    const blogsAfterOperation = await blogsInDb()
    expect(blogsAfterOperation.length).toBe(blogsAtStart.length + 1)

    const titles = blogsAfterOperation.map(r => r.title)
    expect(titles).toContain('Kekseliäs otsikko')

  })

  test('blog post failure with invalid data', async () => {
    const blogsAtStart = await blogsInDb()

    const newBlog = {
      title: 'Epäonnistuva otsikko'
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAfterOperation = await blogsInDb()

    const titles = blogsAfterOperation.map(r => r.title)

    expect(blogsAfterOperation.length).toBe(blogsAtStart.length)
  })

  test('blog without likes is zero', async () => {
    const blogsAtStart = await blogsInDb()

    const newBlog = {
      title: 'Kekseliäs otsikko',
      author: 'Peter Pasanen',
      url: 'https://naurunappula.com/',
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    const blogsAfterOperation = await blogsInDb()
    expect(blogsAfterOperation.length).toBe(blogsAtStart.length + 1)

    expect(response.body.likes).toBe(0)
  })

  describe('blog get tests', () => {

    test('blogs are returned', async () => {
      const response = await api
        .get('/api/blogs')
    
      expect(response.body.length).toBe(initialBlogs.length)
    })
  
    test('returned blogs are json', async () => {
      const blogsInDatabase = await blogsInDb()
  
      const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
      expect(response.body.length).toBe(initialBlogs.length)
  
      const returnedTitles = response.body.map(r => r.title)
      blogsInDatabase.forEach(blog => {
        expect(returnedTitles).toContain(blog.title)
      })
    })
  
    test('first from dijkstra', async () => {
      const response = await api
        .get('/api/blogs')
    
      expect(response.body[0].title).toBe('Go To Statement Considered Harmful')
    })
  })

  describe('blog deletion', async () => {
    
    let addedBlog

    beforeEach(async () => {
      addedBlog = new Blog({
        title: 'http delete',
        author: 'Matti M',
        url: 'https://fullstack-hy.github.io/osa4/'
      })
      await addedBlog.save()
    })

    test('DELETE /api/blogs/:id succeeds with proper statuscode', async () => {
      const blogsAtStart = await blogsInDb()
      await api
        .delete(`/api/blogs/${addedBlog._id}`)
        .expect(204)

      const blogsAfterOperation = await blogsInDb()

      const titles = blogsAfterOperation.map(r => r.title)

      expect(titles).not.toContain(addedBlog.title)
      expect(blogsAfterOperation.length).toBe(blogsAtStart.length - 1)
    })
  })

  afterAll(() => {
    server.close()
  })
})


