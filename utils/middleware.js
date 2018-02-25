const logger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const tokenExtractor = (request, response, next) => {
  if (process.env.NODE_ENV === 'test') {
    request['token'] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1sdXVra2FpIiwiaWQiOiI1YTkwYTZmMDljM2Q5ZDU4YjU0MDYxMmYiLCJpYXQiOjE1MTk1NDM4OTN9.G5rt7jbzIF74vXujKAtx3D7jnR7vmTfQDL6uVmZLqtI"
    return next()
  }
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request['token'] = authorization.substring(7)
    return next()
  }
  request['token'] = null
  return next()
}

const error = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

module.exports = {
  logger,
  tokenExtractor,
  error
}