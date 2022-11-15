const router = require('express').Router()
const jwt = require("jsonwebtoken")
const { Note, User } = require('../models')

const tokenExtractor = (req, res, next) => {
   
    const authorization = req.get('authorization')
    console.log(authorization)
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      try {
        req.decodedToken = jwt.verify(authorization.substring(7), "secret")
        console.log(req.decodedToken);
      } catch{
        return res.status(401).json({ error: 'token invalid' })
      }
    }  else {
      return res.status(401).json({ error: 'token missing' })
    }
    next()
  }

const noteFinder = async (req, res, next) => {
    req.note = await Note.findByPk(req.params.id)
    next()
  }

router.get('/', async (req, res) => {
    const notes = await Note.findAll({
        attributes: { exclude: ['userId'] },
        include: {
          model: User,
          attributes: ['name']
        }
      })
      res.json(notes)
})

router.post('/', tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const note = await Note.create({...req.body, userId: user.id, date: new Date()})
    res.json(note)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

router.get('/:id', noteFinder, async (req, res) => {
    if (req.note) {
      res.json(req.note)
    } else {
      res.status(404).end()
    }
  })
  
  router.delete('/:id', tokenExtractor, noteFinder, async (req, res) => {
    try {
        const user = await User.findByPk(req.decodedToken.id)
        if(req.note.userId !== user.id){
            res.json("Only the Creator can delete notes!")
        }
        if (req.note && req.note.userId === user.id) {
            await req.note.destroy()
        }
    } catch (error) {
        res.json("ERROR HAPPENED!")
    }
    res.status(204).end()
  })
  
  router.put('/:id', tokenExtractor, noteFinder, async (req, res) => {
    if (req.note) {
      req.note.important = req.body.important
      await req.note.save()
      res.json(req.note)
    } else {
      res.status(404).end()
    }
  })

module.exports = router