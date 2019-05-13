const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', function(req, res, next) {
  res.status(200).json({message: 'API Works'});
});

module.exports = router;