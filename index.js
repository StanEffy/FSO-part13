const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const notesRouter = require('./controllers/notes')
const blogsRouter = require('./controllers/blogs')

app.use(express.json())

app.use(urlencodedParser);

app.use('/api/notes', notesRouter)
app.use('/api/blogs', blogsRouter)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()





// create application/x-www-form-urlencoded parser
// 

//     app.use(urlencodedParser);

