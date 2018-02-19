const listHelper = require('../utils/list_helper')

const manyBlogs = [
    
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5dsa9g1gr8adg',
    title: 'Otsikko 1',
    author: 'Matti Meikäläinen',
    url: 'http://kuvaton.com',
    likes: 13,
    __v: 0
  },
  {
    _id: '321321adsa',
    title: 'Otsikko 2',
    author: 'Maija Meikäläinen',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 2,
    __v: 0
  },
  {
    _id: '321321adsb',
    title: 'Otsikko 3',
    author: 'Maija Meikäläinen',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 3,
    __v: 0
  },
  {
    _id: '321321adsc',
    title: 'Otsikko 4',
    author: 'Maija Meikäläinen',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 4,
    __v: 0
  }
]

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

describe('total likes', () => {

  test('likes total multiple blogs', () => {
    const result = listHelper.totalLikes(manyBlogs)
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
    const result = listHelper.favouriteBlog(manyBlogs)
    expect(result).toEqual(manyBlogs[1])
  })

  test('favourite single blog', () => {
    const result = listHelper.favouriteBlog(listWithOneBlog)
    expect(result).toEqual(manyBlogs[0])
  })

  test('favourite empty blog', () => {
    const result = listHelper.favouriteBlog([])
    expect(result).toBe(undefined)
  })
})

describe('most blogs', () => {

  test('most blogs multiple blogs', () => {
    const result = listHelper.mostBlogs(manyBlogs)
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


test('dummy is called', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

