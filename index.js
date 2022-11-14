require('dotenv').config()
const { Sequelize, Model, DataTypes, QueryTypes } = require('sequelize')
const express = require('express')
const app = express()

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
        require: true,
        rejectUnauthorized: false
      }
  },
});

console.log(process.env.DATABASE_URL);

let blog = sequelize.define("blogs", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      author: {
        type: DataTypes.STRING
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
}, {
    modelName: "blogs",
    freezeTableName: true
})

class Note extends Model {}

Note.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  important: {
    type: DataTypes.BOOLEAN
  },
  date: {
    type: DataTypes.DATE
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'note'
})

Note.sync()

app.get('/api/notes', async (req, res) => {
  const notes = await Note.findAll()
  res.json(notes)
})

app.get('/api/notes/:id', async (req, res) => {
    const note = await Note.findByPk(req.params.id)
    if (note) {
      res.json(note)
    } else {
      res.status(404).end()
    }
  })

app.get('/api/blogs', async (req, res) => {
    const blogs = await blog.findAll();

    res.json(blogs);
  })

app.post('/api/blogs', async (req, res) => {
    const blog = await blog.create(req.body);

    res.json(blog);
  })

app.delete('/api/blogs/:id', async (req, res) => {
    const {id} = req.body;

    const blog = await blog.destroy({ where: { id } });

    res.json(blog);
  })


const PORT = process.env.PORT || 3002

app.listen(PORT, () => {
console.log(sequelize.models)
  console.log(`Server running on port ${PORT}`)
})