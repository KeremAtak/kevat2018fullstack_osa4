const listHelper = require('../utils/list_helper')
const { format, initialBlogs, listWithOneBlog, blogsInDb } = require('./test_helper')

describe('total likes', () => {

  test('likes total multiple blogs', () => {
    const result = listHelper.totalLikes(initialBlogs)
    expect(result).toBe(27)
  })

  test('likes total single blog', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('likes total empty blog', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })
})

describe('favourite blog', () => {


  test('favourite multiple blogs', () => {
    const result = listHelper.favouriteBlog(initialBlogs)
    expect(result).toEqual(initialBlogs[1])
  })

  test('favourite single blog', () => {
    const result = listHelper.favouriteBlog(listWithOneBlog)
    expect(result).toEqual(initialBlogs[0])
  })

  test('favourite empty blog', () => {
    const result = listHelper.favouriteBlog([])
    expect(result).toBe(undefined)
  })
})

describe.skip('most blogs', () => {

  test('most blogs multiple blogs', () => {
    const result = listHelper.mostBlogs(initialBlogs)
    expect(result).toEqual({author: "Maija Meikäläinen", blogs: 3})
  })

  test('most blogs single blog', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual({author: "Edsger W. Dijkstra", blogs: 1})
  })

  test('most blogs empty blog', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toBe([])
  })
})


test.skip('dummy is called', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

