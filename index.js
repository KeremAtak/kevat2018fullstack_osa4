const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
<<<<<<< aa5b27509db32442ec58fe527112ec8c7a27acf9
const notesRouter = require('./controllers/notes')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const config = require('./utils/config')

mongoose.connect(config.mongoUrl)
=======
const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose
  .connect(config.mongoUrl)
  .then( () => {
    console.log('connected to database', config.mongoUrl)
  })
  .catch( err => {
    console.log(err)
  })

>>>>>>> pusku
mongoose.Promise = global.Promise

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))
app.use(middleware.logger)

<<<<<<< aa5b27509db32442ec58fe527112ec8c7a27acf9

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/notes', notesRouter)
=======
app.use('/api/blogs', blogsRouter)
>>>>>>> pusku

app.use(middleware.error)

const server = http.createServer(app)

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}