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

app.get('/api/notes', async (req, res) => {
  const notes = await Note.findAll()
  res.json(notes)
})


app.get('/api/blogs', async (req, res) => {
    const blogs = await blog.findAll()
    res.json(blogs)
  })
  

const PORT = process.env.PORT || 3002

app.listen(PORT, () => {
console.log(sequelize.models)
  console.log(`Server running on port ${PORT}`)
})