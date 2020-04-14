const router = require('express').Router()
const verify = require('./validateToken')

router.get('/', verify, (req, res) => {
  res.json({
    posts: {
      title: 'Hey',
      desc: 'Cool'
    }
  })
})

module.exports = router