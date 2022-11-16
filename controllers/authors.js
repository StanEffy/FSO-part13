const router = require('express').Router()
const { Blog, User } = require('../models')

const { fn, col } = require('sequelize')


router.get('/', async (req, res) => {
    try {
        const authors = await Blog.findAll({
			attributes: [
				'author',
				[fn('COUNT', col('title')), 'articles'],
				[fn('SUM', col('likes')), 'likes'],
			],
			group: 'author',
			order: [[col('likes'), 'DESC']],
		});
		res.json(authors);
    } catch(error) {
      return res.status(400).json({ error })
    }
  })

  module.exports = router;