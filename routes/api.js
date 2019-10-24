var express = require('express')
var router = express.Router()
const db = require('../mongodb')

router.get('/', function(req, res, next) {
  res.json({result: 'ok'})
})

router.get('/board/list', async function(req, res, next) {
  res.json({result: await db.getTable('board')})
})

router.post('/board/list', function(req, res, next) {
  const { body } = req
  try {
    const { altitude, latitude, longitude } = body.location
    // [body.text, latitude, longitude, altitude, Date.now()]
    db.addToTable('board', {...body, ...(body.location)})
    res.json({result: 'ok'})
  } catch(error) {
    console.log(error);
    res.json({result: 'error', error })
  }
})

module.exports = router
