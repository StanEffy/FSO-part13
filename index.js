require('dotenv').config();
const { Sequelize, Model, DataTypes, QueryTypes } = require('sequelize');
const express = require('express');
const app = express();
const bodyParser = require("body-parser");




// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

    app.use(urlencodedParser);


const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
        require: true,
        rejectUnauthorized: false
      }
  },
});


let Blog = sequelize.define("blogs", {
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

Blog.sync()

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
    const blogs = await Blog.findAll();

    res.json(blogs);
  })

app.post('/api/blogs', async (req, res) => {
    const {body} = req;
    
    const newBlog = await Blog.create(body);

     res.json("DONE");
  })

app.delete('/api/blogs/:id', async (req, res) => {
    const {id} = req.params;

    const blog = await Blog.destroy({ where: { id } });

    res.json(blog);
  })


const PORT = process.env.PORT || 3002

app.listen(PORT, () => {
console.log(sequelize.models)
  console.log(`Server running on port ${PORT}`)
})